"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEvaluacionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const tevaluacion_schema_1 = require("./tevaluacion.schema");
const usuario_schema_1 = require("../usuarios/schemas/usuario.schema");
const stopEn_1 = require("./stopwords/stopEn");
const generative_ai_1 = require("@google/generative-ai");
let TEvaluacionService = class TEvaluacionService {
    tevaluacionModel;
    usuarioModel;
    constructor(tevaluacionModel, usuarioModel) {
        this.tevaluacionModel = tevaluacionModel;
        this.usuarioModel = usuarioModel;
    }
    findAll() {
        return this.tevaluacionModel.find();
    }
    async getHistorialByUser(userId) {
        return this.tevaluacionModel.find({ usuarioId: userId }).sort({ createdAt: -1 }).exec();
    }
    async generateGeminiCompletion(prompt, schema) {
        try {
            const GEMINI_API_KEY = process.env.GEMINIKEY;
            const genAI = new generative_ai_1.GoogleGenerativeAI(GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
            const generationConfig = {
                temperature: 0.4
            };
            if (schema) {
                generationConfig.responseMimeType = "application/json";
                generationConfig.responseSchema = schema;
            }
            const contents = [{ role: 'user', parts: [{ text: prompt }] }];
            const result = await model.generateContent({
                contents: contents,
                generationConfig: generationConfig
            });
            return result.response.text();
        }
        catch (error) {
            throw new Error("Fallo en la generación de contenido de Gemini.");
        }
    }
    create(data) {
        const cleanedData = Object.fromEntries(Object.entries(data).map(([key, value]) => [key.replace(/:$/, ''), value]));
        return new this.tevaluacionModel(cleanedData).save();
    }
    aprobar(id, estado) {
        return this.tevaluacionModel.findByIdAndUpdate(id, { estado }, { new: true });
    }
    async evaluateResumeCHATGPT(userId, content, keywords) {
        const costoTokens = 5;
        const user = await this.usuarioModel.findById(userId);
        if (!user || user.tokens < costoTokens) {
            throw new common_1.HttpException('Tokens insuficientes', common_1.HttpStatus.PAYMENT_REQUIRED);
        }
        user.tokens -= costoTokens;
        await user.save();
        const prompt = `
      Eres un experto evaluador de currículums.
      Evalúa los siguientes textos de hojas de vida y compáralos con estas palabras clave: ${keywords.join(', ')}.
      
      Debes extraer y calcular las siguientes métricas detalladas del candidato basándote en un análisis semántico estricto:
      - score: Puntuación global de idoneidad (0-100)
      - scoreTecnico: Puntuación específica de habilidades técnicas y herramientas requeridas (0-100)
      - scoreExperiencia: Puntuación basada en la relevancia de su experiencia laboral (0-100)
      - scoreBlando: Puntuación estimada de habilidades blandas, comunicación o metodologías (0-100)
      - heatmapData: Identifica las 5 categorías principales de habilidades extraídas de ESTE currículum. Para cada categoría, genera un array 'cells' con exactamente 8 valores numéricos decimales (entre 0.05 y 1.0) que representen su nivel de dominio.

      LA ÚNICA RESPUESTA que debes generar es un ARRAY DE OBJETOS JSON siguiendo estrictamente el esquema provisto.
      
      Hoja(s) de Vida a Evaluar:
      ${content}
    `;
        const evaluationSchema = {
            type: "array",
            items: {
                type: "object",
                properties: {
                    postulante: { type: "string" },
                    score: { type: "integer" },
                    scoreTecnico: { type: "integer" },
                    scoreExperiencia: { type: "integer" },
                    scoreBlando: { type: "integer" },
                    explanation: { type: "string" },
                    heatmapData: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                category: { type: "string" },
                                cells: {
                                    type: "array",
                                    items: { type: "number" }
                                }
                            },
                            required: ["category", "cells"]
                        }
                    }
                },
                required: ["postulante", "score", "scoreTecnico", "scoreExperiencia", "scoreBlando", "explanation", "heatmapData"]
            }
        };
        try {
            const responseText = await this.generateGeminiCompletion(prompt, evaluationSchema);
            const transformado = JSON.parse(responseText.trim());
            const nuevaEvaluacion = new this.tevaluacionModel({
                usuarioId: userId,
                responsable: user.nombres,
                fecharegistro: new Date().toISOString(),
                keywords: keywords,
                resultados: transformado,
                estado: 'Completado',
                resultado: 'Análisis IA Lote'
            });
            await nuevaEvaluacion.save();
            return { "RespuestaModelo": transformado };
        }
        catch (error) {
            user.tokens += costoTokens;
            await user.save();
            throw new common_1.HttpException('Error evaluando hoja de vida con Gemini', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    ObtenerContenido(content, numero) {
        try {
            content = this.reprocesarTexto(content);
            return 'Hoja de vida ' + numero + ': ' + content;
        }
        catch (e) {
            return '';
        }
    }
    reprocesarTexto(raw) {
        const stopwords = require('stopwords-es');
        stopwords.concat(stopEn_1.stopwordsEN);
        let texto = raw.toLowerCase();
        texto = texto.replace(/[^a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]/g, ' ');
        const palabras = texto.split(/\s+/);
        const palabrasFiltradas = palabras.filter((palabra) => !stopwords.includes(palabra));
        return palabrasFiltradas.join(' ');
    }
};
exports.TEvaluacionService = TEvaluacionService;
exports.TEvaluacionService = TEvaluacionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(tevaluacion_schema_1.TEvaluacion.name)),
    __param(1, (0, mongoose_1.InjectModel)(usuario_schema_1.Usuario.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], TEvaluacionService);
//# sourceMappingURL=tevaluacion.service.js.map
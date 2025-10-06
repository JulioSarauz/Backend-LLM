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
const openai_1 = require("openai");
const stopEn_1 = require("./stopwords/stopEn");
const generative_ai_1 = require("@google/generative-ai");
let TEvaluacionService = class TEvaluacionService {
    tevaluacionModel;
    openai;
    constructor(tevaluacionModel) {
        this.tevaluacionModel = tevaluacionModel;
        this.openai = new openai_1.default({});
        console.log(process.env.OPENAI_API_KEY);
        this.validarClave(process.env.OPENAI_API_KEY).then((esValida) => {
            console.log(esValida ? '✅ API Key válida' : '❌ API Key inválida');
        });
    }
    async validarClave(apiKey) {
        const openai = new openai_1.default({ apiKey });
        try {
            const models = await openai.models.list();
            return models.data.length > 0;
        }
        catch (error) {
            if (error.status === 401 || error.code === 'invalid_api_key') {
                console.error('❌ Clave inválida');
                return false;
            }
            console.error('⚠️ Error inesperado:', error);
            return false;
        }
    }
    findAll() {
        return this.tevaluacionModel.find();
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
            const result = await model.generateContent({ contents: contents }, { config: generationConfig });
            return result.response.text();
        }
        catch (error) {
            console.error("Error al llamar a Gemini:", error);
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
    async evaluateResumeCHATGPT(content, keywords) {
        let prompt = `
    Eres un experto evaluador de currículums.
    Evalúa los siguientes textos de hojas de vida y compáralos con estas palabras clave: ${keywords.join(', ')}.
    Usa análisis semántico (sinónimos, contexto, experiencia, etc.) para asignar una puntuación.

    LA ÚNICA RESPUESTA que debes generar es un ARRAY DE OBJETOS JSON.
    NO incluyas ningún texto introductorio, explicaciones, formateo de Markdown (como \`\`\`json), ni cualquier otro carácter fuera del ARRAY JSON.

    Estructura Requerida (Sigue ESTA plantilla al pie de la letra):
    [
      {
        "postulante": "Nombres completos del candidato",
        "score": 0-100,
        "explanation": "Justificación clara y concisa de la puntuación y la relevancia de su perfil."
      }
    ]
    
    Hoja(s) de Vida a Evaluar:
    ${content}
  `;
        const evaluationSchema = {
            type: "array",
            items: {
                type: "object",
                properties: {
                    postulante: { type: "string", description: "Nombres completos del postulante." },
                    score: { type: "integer", description: "Puntuación de 0 a 100 basada en la relevancia de las palabras clave." },
                    explanation: { type: "string", description: "Justificación detallada de por qué se asignó esa puntuación." }
                },
                required: ["postulante", "score", "explanation"]
            }
        };
        try {
            const responseText = await this.generateGeminiCompletion(prompt, evaluationSchema);
            console.log(responseText);
            const respuestaFinal = "" + { "RespuestaModelo": responseText.trim() };
            return JSON.parse(respuestaFinal);
        }
        catch (error) {
            console.error('Error en evaluateResumeCHATGPT:', error);
            throw new Error('Error evaluando hoja de vida con Gemini');
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
        let stopwords = require('stopwords-es');
        stopwords.concat(stopEn_1.stopwordsEN);
        let texto = raw.toLowerCase();
        texto = texto.replace(/[^a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]/g, ' ');
        const palabras = texto.split(/\s+/);
        const palabrasFiltradas = palabras.filter(palabra => !stopwords.includes(palabra));
        return palabrasFiltradas.join(' ');
    }
};
exports.TEvaluacionService = TEvaluacionService;
exports.TEvaluacionService = TEvaluacionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(tevaluacion_schema_1.TEvaluacion.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TEvaluacionService);
//# sourceMappingURL=tevaluacion.service.js.map
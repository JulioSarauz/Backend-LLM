import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TEvaluacion, TEvaluacionDocument } from './tevaluacion.schema';
import { Usuario, UsuarioDocument } from '../usuarios/schemas/usuario.schema';
import { stopwordsEN } from './stopwords/stopEn';
import { GoogleGenerativeAI, GenerationConfig } from '@google/generative-ai';

@Injectable()
export class TEvaluacionService {
  
  constructor(
    @InjectModel(TEvaluacion.name) private tevaluacionModel: Model<TEvaluacionDocument>,
    @InjectModel(Usuario.name) private usuarioModel: Model<UsuarioDocument>
  ) {}

  findAll() {
    return this.tevaluacionModel.find();
  }

  async getHistorialByUser(userId: string) {
    return this.tevaluacionModel.find({ usuarioId: userId }).sort({ createdAt: -1 }).exec();
  }

  async generateGeminiCompletion(prompt: string, schema?: any): Promise<string> {
    try {
        const GEMINI_API_KEY: string = process.env.GEMINIKEY as string;
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY); 
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        
        const generationConfig: GenerationConfig = { 
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

    } catch (error) {
        throw new Error("Fallo en la generación de contenido de Gemini.");
    }
  }

  create(data: Partial<TEvaluacion>) {
    const cleanedData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key.replace(/:$/, ''), value])
    );
    return new this.tevaluacionModel(cleanedData).save();
  }

  aprobar(id: string, estado: string) {
    return this.tevaluacionModel.findByIdAndUpdate(id, { estado }, { new: true });
  }

  async evaluateResumeCHATGPT(userId: string, content: string, keywords: string[]) {
    const costoTokens = 5;
    const user = await this.usuarioModel.findById(userId);

    if (!user || user.tokens < costoTokens) {
      throw new HttpException('Tokens insuficientes', HttpStatus.PAYMENT_REQUIRED);
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

      return {"RespuestaModelo": transformado};
    } catch (error) {
      user.tokens += costoTokens;
      await user.save();
      throw new HttpException('Error evaluando hoja de vida con Gemini', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  ObtenerContenido(content: string, numero: number) {
    try {
      content = this.reprocesarTexto(content);
      return 'Hoja de vida ' + numero + ': ' + content;
    } catch (e) {
      return '';
    }
  }

  reprocesarTexto(raw: string): string {
    const stopwords = require('stopwords-es') as string[];
    stopwords.concat(stopwordsEN);
    let texto = raw.toLowerCase();
    texto = texto.replace(/[^a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]/g, ' ');
    const palabras = texto.split(/\s+/);
    const palabrasFiltradas = palabras.filter((palabra: string) => !stopwords.includes(palabra));
    return palabrasFiltradas.join(' ');
  }
}
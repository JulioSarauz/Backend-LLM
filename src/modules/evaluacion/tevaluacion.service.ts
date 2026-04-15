import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TEvaluacion } from './tevaluacion.schema';
import { stopwordsEN } from './stopwords/stopEn';
import { 
  GoogleGenerativeAI, 
  GenerationConfig 
} from '@google/generative-ai';

@Injectable()
export class TEvaluacionService {
  
  constructor(
    @InjectModel(TEvaluacion.name) private tevaluacionModel: Model<TEvaluacion>
  ) {}

  findAll() {
    return this.tevaluacionModel.find();
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

  async evaluateResumeCHATGPT(content: string, keywords: string[]) {
    const prompt = `
      Eres un experto evaluador de currículums.
      Evalúa los siguientes textos de hojas de vida y compáralos con estas palabras clave: ${keywords.join(', ')}.
      
      Debes extraer y calcular las siguientes métricas detalladas del candidato basándote en un análisis semántico estricto de su experiencia y conocimientos:
      - score: Puntuación global de idoneidad (0-100)
      - scoreTecnico: Puntuación específica de habilidades técnicas y herramientas (0-100)
      - scoreExperiencia: Puntuación basada en los años y relevancia de su experiencia laboral (0-100)
      - scoreBlando: Puntuación estimada de habilidades blandas, liderazgo o metodologías ágiles (0-100)
      - heatmapData: Un análisis de 6 categorías exactas: 'Frontend', 'Backend', 'Arquitectura', 'Bases de Datos', 'DevOps', 'Agile'. Para cada categoría, genera un array 'cells' con exactamente 8 valores numéricos decimales (entre 0.05 y 1.0) que representen la intensidad, progresión o dominio histórico en sub-áreas de esa categoría.

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
      return {"RespuestaModelo": transformado};
    } catch (error) {
      throw new Error('Error evaluando hoja de vida con Gemini');
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
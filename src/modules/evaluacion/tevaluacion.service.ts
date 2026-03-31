import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TEvaluacion } from './tevaluacion.schema';
import { stopwordsEN } from './stopwords/stopEn';
import { 
  GoogleGenerativeAI, 
  GenerateContentRequest, 
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
        
        const result = await model.generateContent(
            { contents: contents }, 
            { config: generationConfig } as any 
        ); 

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
    const palabrasFiltradas = palabras.filter(palabra => !stopwords.includes(palabra));
    return palabrasFiltradas.join(' ');
  }
}
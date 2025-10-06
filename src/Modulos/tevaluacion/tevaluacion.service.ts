// adopciones/adopciones.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TEvaluacion } from './tevaluacion.schema';
import OpenAI from 'openai';
import { stopwordsEN } from './stopwords/stopEn';
// Importa la librería necesaria
import { GoogleGenerativeAI } from "@google/generative-ai";

@Injectable()
export class TEvaluacionService {
  private readonly openai: OpenAI;


  constructor(
    @InjectModel(TEvaluacion.name) private tevaluacionModel: Model<TEvaluacion>
  ) {
    this.openai = new OpenAI({
    })
    console.log(process.env.OPENAI_API_KEY);
    this.validarClave(process.env.OPENAI_API_KEY!).then((esValida) => {
      console.log(esValida ? '✅ API Key válida' : '❌ API Key inválida');
    });

  }


  async validarClave(apiKey: string): Promise<boolean> {
    const openai = new OpenAI({ apiKey });

    try {
      const models = await openai.models.list();
      return models.data.length > 0;
    } catch (error: any) {
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


  async generateGeminiCompletion(prompt) {
    try {
      const GEMINI_API_KEY: any = process.env.GEMINIKEY;
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.4,
        },
      });
      const response = await result.response;
      const text = response.text();
      const respuestaFinal = {"RespuestaModelo":text}
      return respuestaFinal;
    } catch (error) {
      console.error("Error al llamar a Gemini:", error);
      return null;
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

  async evaluateResumeCHATGPT(
    content: string,
    keywords: string[],
  ) {
    let prompt = `
    Evalúa el siguiente texto de varias hojas de vidas y compáralas con estas palabras clave: ${keywords.join(', ')}.
    Usa análisis semántico (sinónimos, contexto, etc.) y devuelve un JSON con:
    {
      "postulante":"Nombres completos"
      "score": 0-100,
      "explanation": "por qué consideras que esta hoja de vida es relevante"
    }
    ${content}
    `;
    return await this.generateGeminiCompletion(prompt);
    // const maxChars = 3000;
    // prompt = prompt.length > maxChars ? prompt.slice(0, maxChars) : prompt;
    // console.log(prompt);
    // console.log(prompt.length);

    // try {
    //   const completion = await this.openai.chat.completions.create({
    //     model: 'gpt-3.5-turbo',//'gpt-4.1',
    //     messages: [{ role: 'user', content: prompt }],
    //     temperature: 0.4,
    //   });

    //   if (!completion.choices || completion.choices.length === 0) {
    //     throw new Error('Respuesta vacía del modelo OpenAI');
    //   }

    //   const response = completion.choices[0].message?.content || '{}';
    //   return JSON.parse(response);
    // } catch (error) {
    //   console.error('Error en evaluateResumeCHATGPT:', error);
    //   throw new InternalServerErrorException('Error evaluando hoja de vida con ChatGPT');
    // }
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
    let stopwords = require('stopwords-es') as string[];
    stopwords.concat(stopwordsEN)
    // 1. Pasar todo a minúsculas
    let texto = raw.toLowerCase();
    // 2. Eliminar caracteres no alfabéticos (excepto espacios)
    texto = texto.replace(/[^a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]/g, ' ');
    // 3. Tokenizar por palabra
    const palabras = texto.split(/\s+/);
    // 4. Eliminar stopwords
    const palabrasFiltradas = palabras.filter(palabra => !stopwords.includes(palabra));
    // 5. Reconstruir el texto limpio
    return palabrasFiltradas.join(' ');
  }
}
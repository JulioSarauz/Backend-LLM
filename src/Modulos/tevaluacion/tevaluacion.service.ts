// adopciones/adopciones.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TEvaluacion } from './tevaluacion.schema';
import * as pdfParse from 'pdf-parse';
import OpenAI from 'openai';
import { stopwordsEN } from './stopwords/stopEn';

@Injectable()
export class TEvaluacionService {
  private readonly openai: OpenAI;

  
  constructor(
    @InjectModel(TEvaluacion.name) private tevaluacionModel: Model<TEvaluacion>
  ) {
     this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
    console.log(process.env.OPENAI_API_KEY);
    // Ejemplo de uso
    this.validarClave(process.env.OPENAI_API_KEY!).then((esValida) => {
      console.log(esValida ? '✅ API Key válida' : '❌ API Key inválida');
});
    
  }


  async validarClave(apiKey: string): Promise<boolean> {
  const openai = new OpenAI({ apiKey });

  try {
    // Llamada mínima para validar la clave
    const models = await openai.models.list();
    return models.data.length > 0; // si devuelve modelos, la clave es válida
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
  ): Promise<{ score: number; explanation: string }> {
    const prompt = `
    Evalúa el siguiente texto de varias hojas de vidas y compáralas con estas palabras clave: ${keywords.join(', ')}.
    Usa análisis semántico (sinónimos, contexto, etc.) y devuelve un JSON con:
    {
      "postulante":"Nombres completos"
      "score": 0-100,
      "explanation": "por qué consideras que esta hoja de vida es relevante"
    }
    ${content}
    `;
    console.log(prompt);
    
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',//'gpt-4.1',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.4,
      });

      if (!completion.choices || completion.choices.length === 0) {
        throw new Error('Respuesta vacía del modelo OpenAI');
      }

      const response = completion.choices[0].message?.content || '{}';
      return JSON.parse(response);
    } catch (error) {
      console.error('Error en evaluateResumeCHATGPT:', error);
      throw new InternalServerErrorException('Error evaluando hoja de vida con ChatGPT');
    }
  
  }

  ObtenerContenido(content: string, numero:number){
    try{
      content = this.reprocesarTexto(content);
      return 'Hoja de vida '+numero+ ': '+content;
    }catch(e){
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
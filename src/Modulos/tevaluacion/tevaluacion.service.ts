// adopciones/adopciones.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TEvaluacion } from './tevaluacion.schema';
import * as pdfParse from 'pdf-parse';
import OpenAI from 'openai';



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
    Evalúa el siguiente texto de una hoja de vida y compáralo con estas palabras clave: ${keywords.join(', ')}.
    Usa análisis semántico (sinónimos, contexto, etc.) y devuelve un JSON con:
    {
      "score": 0-100,
      "explanation": "por qué consideras que esta hoja de vida es relevante"
    }

    Hoja de vida:
    ${content}
    `;

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4.1',
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
}
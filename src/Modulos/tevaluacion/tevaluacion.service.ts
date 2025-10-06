// adopciones/adopciones.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TEvaluacion } from './tevaluacion.schema';
import OpenAI from 'openai';
import { stopwordsEN } from './stopwords/stopEn';
import { 
  GoogleGenerativeAI, 
  GenerateContentRequest, 
  GenerationConfig // <-- ¡CORREGIDO!
} from '@google/generative-ai';
// Asegúrate de usar 'GoogleGenerativeAI'

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


 
async generateGeminiCompletion(prompt: string, schema?: any):Promise<string> {
    try {
        const GEMINI_API_KEY: any = process.env.GEMINIKEY;
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY); 
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        
        // 1. Definimos la configuración base con el tipo GenerationConfig
        const generationConfig: GenerationConfig = { 
            temperature: 0.4 
        }; 

        if (schema) {
            generationConfig.responseMimeType = "application/json";
            generationConfig.responseSchema = schema;
        }

        const contents = [{ role: 'user', parts: [{ text: prompt }] }];
        
        
        // 2. SOLUCIÓN FINAL: Usamos la estructura anidada de 'config' y forzamos 'any'
        // Esto le permite al compilador pasar el objeto sin el error 2559,
        // aunque sabemos que la estructura anidada es lo que la API espera.
        const result = await model.generateContent(
            { contents: contents }, // Primer argumento: La solicitud
            { config: generationConfig } as any // <-- ¡Forzamos a 'any' para evitar el error de tipado!
        ); 

        // El acceso al texto es correcto
         return result.response.text();

    } catch (error) {
        console.error("Error al llamar a Gemini:", error);
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

  // async evaluateResumeCHATGPT(
  //   content: string,
  //   keywords: string[],
  // ) {
  //   let prompt = `
  //   Evalúa el siguiente texto de varias hojas de vidas y compáralas con estas palabras clave: ${keywords.join(', ')}.
  //   Usa análisis semántico (sinónimos, contexto, etc.) y devuelve un ARRAY DE JSON con:
  //   {
  //     "postulante":"Nombres completos"
  //     "score": 0-100,
  //     "explanation": "por qué consideras que esta hoja de vida es relevante"
  //   }
  //   Para la respuesta solo reemplaza el texto anterior es decir coloca ahi el nombre, el score y la explanation, no modifciques esa cadena solo reemplaza ahi
  //   ${content}
  //   `;
  //   return await this.generateGeminiCompletion(prompt);
  //   // const maxChars = 3000;
  //   // prompt = prompt.length > maxChars ? prompt.slice(0, maxChars) : prompt;
  //   // console.log(prompt);
  //   // console.log(prompt.length);

  //   // try {
  //   //   const completion = await this.openai.chat.completions.create({
  //   //     model: 'gpt-3.5-turbo',//'gpt-4.1',
  //   //     messages: [{ role: 'user', content: prompt }],
  //   //     temperature: 0.4,
  //   //   });

  //   //   if (!completion.choices || completion.choices.length === 0) {
  //   //     throw new Error('Respuesta vacía del modelo OpenAI');
  //   //   }

  //   //   const response = completion.choices[0].message?.content || '{}';
  //   //   return JSON.parse(response);
  //   // } catch (error) {
  //   //   console.error('Error en evaluateResumeCHATGPT:', error);
  //   //   throw new InternalServerErrorException('Error evaluando hoja de vida con ChatGPT');
  //   // }
  // }


  // En tu archivo tevaluacion.service.ts
async evaluateResumeCHATGPT(
  content: string,
  keywords: string[],
) {
  // 1. Definir el PROMPT reforzado
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

  // 2. Definir el Esquema JSON (Schema) para una respuesta robusta
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
    // 3. Llamar a la función, pasando el esquema y la instrucción de JSON Mode
    const responseText = await this.generateGeminiCompletion(
        prompt, 
        evaluationSchema // Pasamos el esquema para una respuesta estructurada
    );
    console.log(responseText);
    
    // 4. El responseText debe ser un JSON puro, listo para parsear
    const transformado = JSON.parse(responseText.trim());
    return {"RespuestaModelo":transformado};
  } catch (error) {
    console.error('Error en evaluateResumeCHATGPT:', error);
    // Manejo de errores
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
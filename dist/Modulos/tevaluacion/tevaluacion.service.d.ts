import { Model } from 'mongoose';
import { TEvaluacion } from './tevaluacion.schema';
export declare class TEvaluacionService {
    private tevaluacionModel;
    private readonly openai;
    constructor(tevaluacionModel: Model<TEvaluacion>);
    validarClave(apiKey: string): Promise<boolean>;
    findAll(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, TEvaluacion, {}> & TEvaluacion & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, TEvaluacion, {}> & TEvaluacion & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, {}, TEvaluacion, "find", {}>;
    generateGeminiCompletion(prompt: any): Promise<{
        RespuestaModelo: string;
    } | null>;
    create(data: Partial<TEvaluacion>): Promise<import("mongoose").Document<unknown, {}, TEvaluacion, {}> & TEvaluacion & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    aprobar(id: string, estado: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, TEvaluacion, {}> & TEvaluacion & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, TEvaluacion, {}> & TEvaluacion & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, {}, TEvaluacion, "findOneAndUpdate", {}>;
    evaluateResumeCHATGPT(content: string, keywords: string[]): Promise<{
        RespuestaModelo: string;
    } | null>;
    ObtenerContenido(content: string, numero: number): string;
    reprocesarTexto(raw: string): string;
}

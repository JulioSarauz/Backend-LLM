import { Model } from 'mongoose';
import { TEvaluacion } from './tevaluacion.schema';
export declare class TEvaluacionService {
    private tevaluacionModel;
    constructor(tevaluacionModel: Model<TEvaluacion>);
    findAll(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, TEvaluacion, {}> & TEvaluacion & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, TEvaluacion, {}> & TEvaluacion & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, {}, TEvaluacion, "find", {}>;
    generateGeminiCompletion(prompt: string, schema?: any): Promise<string>;
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
        RespuestaModelo: any;
    }>;
    ObtenerContenido(content: string, numero: number): string;
    reprocesarTexto(raw: string): string;
}

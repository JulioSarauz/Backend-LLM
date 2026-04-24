import { Model } from 'mongoose';
import { TEvaluacion, TEvaluacionDocument } from './tevaluacion.schema';
import { UsuarioDocument } from '../usuarios/schemas/usuario.schema';
export declare class TEvaluacionService {
    private tevaluacionModel;
    private usuarioModel;
    constructor(tevaluacionModel: Model<TEvaluacionDocument>, usuarioModel: Model<UsuarioDocument>);
    findAll(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, TEvaluacionDocument, {}> & TEvaluacion & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, TEvaluacionDocument, {}> & TEvaluacion & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, {}, TEvaluacionDocument, "find", {}>;
    getHistorialByUser(userId: string): Promise<(import("mongoose").Document<unknown, {}, TEvaluacionDocument, {}> & TEvaluacion & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    generateGeminiCompletion(prompt: string, schema?: any): Promise<string>;
    create(data: Partial<TEvaluacion>): Promise<import("mongoose").Document<unknown, {}, TEvaluacionDocument, {}> & TEvaluacion & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    aprobar(id: string, estado: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, TEvaluacionDocument, {}> & TEvaluacion & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, TEvaluacionDocument, {}> & TEvaluacion & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, {}, TEvaluacionDocument, "findOneAndUpdate", {}>;
    evaluateResumeCHATGPT(userId: string, content: string, keywords: string[]): Promise<{
        RespuestaModelo: any;
    }>;
    ObtenerContenido(content: string, numero: number): string;
    reprocesarTexto(raw: string): string;
}

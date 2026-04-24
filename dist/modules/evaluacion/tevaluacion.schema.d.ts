import { Document, Types } from 'mongoose';
export type TEvaluacionDocument = TEvaluacion & Document;
export declare class TEvaluacion {
    resultado: string;
    estado: string;
    fecharegistro: string;
    responsable: string;
    fktpostulante: string;
    usuarioId: Types.ObjectId | string;
    keywords: string[];
    resultados: any[];
}
export declare const TEvaluacionSchema: import("mongoose").Schema<TEvaluacion, import("mongoose").Model<TEvaluacion, any, any, any, Document<unknown, any, TEvaluacion, any> & TEvaluacion & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TEvaluacion, Document<unknown, {}, import("mongoose").FlatRecord<TEvaluacion>, {}> & import("mongoose").FlatRecord<TEvaluacion> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;

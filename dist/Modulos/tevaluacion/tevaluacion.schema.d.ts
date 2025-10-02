import { Document } from 'mongoose';
export declare class TEvaluacion extends Document {
    resultado: string;
    estado: string;
    fecharegistro: string;
    responsable: string;
    fktpostulante: string;
}
export declare const TEvaluacionSchema: import("mongoose").Schema<TEvaluacion, import("mongoose").Model<TEvaluacion, any, any, any, Document<unknown, any, TEvaluacion, any> & TEvaluacion & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TEvaluacion, Document<unknown, {}, import("mongoose").FlatRecord<TEvaluacion>, {}> & import("mongoose").FlatRecord<TEvaluacion> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;

import { Document } from 'mongoose';
export declare class TPostulante extends Document {
    correo: string;
    nombres: string;
    celular: string;
    cargo: string;
    genero: string;
    estado: string;
    fecharegistro: string;
    responsable: string;
}
export declare const TPostulanteSchema: import("mongoose").Schema<TPostulante, import("mongoose").Model<TPostulante, any, any, any, Document<unknown, any, TPostulante, any> & TPostulante & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TPostulante, Document<unknown, {}, import("mongoose").FlatRecord<TPostulante>, {}> & import("mongoose").FlatRecord<TPostulante> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;

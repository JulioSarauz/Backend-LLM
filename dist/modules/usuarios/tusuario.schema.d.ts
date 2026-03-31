import { Document } from 'mongoose';
export declare class TUsuario extends Document {
    nombre: string;
    correoinstitucional: string;
    cargo: string;
    estado: string;
    fecharegistro: string;
    resposnable: string;
}
export declare const TUsuarioSchema: import("mongoose").Schema<TUsuario, import("mongoose").Model<TUsuario, any, any, any, Document<unknown, any, TUsuario, any> & TUsuario & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TUsuario, Document<unknown, {}, import("mongoose").FlatRecord<TUsuario>, {}> & import("mongoose").FlatRecord<TUsuario> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;

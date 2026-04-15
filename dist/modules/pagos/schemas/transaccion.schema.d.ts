import { Document, Types } from 'mongoose';
export type TransaccionDocument = Transaccion & Document;
export declare class Transaccion {
    usuarioId: string;
    paypalOrderId: string;
    monto: number;
    tokensAdquiridos: number;
    estado: string;
}
export declare const TransaccionSchema: import("mongoose").Schema<Transaccion, import("mongoose").Model<Transaccion, any, any, any, Document<unknown, any, Transaccion, any> & Transaccion & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Transaccion, Document<unknown, {}, import("mongoose").FlatRecord<Transaccion>, {}> & import("mongoose").FlatRecord<Transaccion> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;

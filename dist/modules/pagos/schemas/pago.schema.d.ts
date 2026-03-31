import { Document } from 'mongoose';
export declare class Pago extends Document {
    sessionId: string;
    usuarioId: string;
    plan: string;
    monto: number;
    estado: string;
}
export declare const PagoSchema: import("mongoose").Schema<Pago, import("mongoose").Model<Pago, any, any, any, Document<unknown, any, Pago, any> & Pago & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Pago, Document<unknown, {}, import("mongoose").FlatRecord<Pago>, {}> & import("mongoose").FlatRecord<Pago> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;

import { Model } from 'mongoose';
import { Usuario } from './schemas/usuario.schema';
export declare class UsuariosService {
    private usuarioModel;
    constructor(usuarioModel: Model<Usuario>);
    findByEmail(email: string): Promise<Usuario | null>;
    findByGoogleId(googleId: string): Promise<Usuario | null>;
    findById(id: string): Promise<Usuario | null>;
    updateTokens(userId: string, tokensToAddOrSubtract: number, nuevoPlan?: string): Promise<Usuario>;
    deducirTokensParaAnalisis(userId: string, costo: number): Promise<void>;
    reembolsarTokens(userId: string, costo: number): Promise<void>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Usuario, {}> & Usuario & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, Usuario, {}> & Usuario & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    create(data: Partial<Usuario>): Promise<import("mongoose").Document<unknown, {}, Usuario, {}> & Usuario & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    update(id: string, updateUsuarioDto: any): Promise<(import("mongoose").Document<unknown, {}, Usuario, {}> & Usuario & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    aprobar(id: string, estado: string): Promise<(import("mongoose").Document<unknown, {}, Usuario, {}> & Usuario & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    remove(id: string): Promise<(import("mongoose").Document<unknown, {}, Usuario, {}> & Usuario & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
}

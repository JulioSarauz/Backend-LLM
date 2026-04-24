import { Model } from 'mongoose';
import { Usuario, UsuarioDocument } from './schemas/usuario.schema';
export declare class UsuariosService {
    private usuarioModel;
    constructor(usuarioModel: Model<UsuarioDocument>);
    findByEmail(email: string): Promise<UsuarioDocument | null>;
    findByGoogleId(googleId: string): Promise<UsuarioDocument | null>;
    findById(id: string): Promise<UsuarioDocument | null>;
    updateTokens(userId: string, tokensToAddOrSubtract: number, nuevoPlan?: string): Promise<UsuarioDocument>;
    deducirTokensParaAnalisis(userId: string, costo: number): Promise<void>;
    reembolsarTokens(userId: string, costo: number): Promise<void>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, UsuarioDocument, {}> & Usuario & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, UsuarioDocument, {}> & Usuario & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    create(data: Partial<Usuario>): Promise<import("mongoose").Document<unknown, {}, UsuarioDocument, {}> & Usuario & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    update(id: string, updateUsuarioDto: any): Promise<(import("mongoose").Document<unknown, {}, UsuarioDocument, {}> & Usuario & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    aprobar(id: string, estado: string): Promise<(import("mongoose").Document<unknown, {}, UsuarioDocument, {}> & Usuario & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    remove(id: string): Promise<(import("mongoose").Document<unknown, {}, UsuarioDocument, {}> & Usuario & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
}

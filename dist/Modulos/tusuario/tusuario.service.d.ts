import { Model } from 'mongoose';
import { TUsuario } from './tusuario.schema';
export declare class TUsuarioService {
    private tusuarioModel;
    constructor(tusuarioModel: Model<TUsuario>);
    findAll(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, TUsuario, {}> & TUsuario & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, TUsuario, {}> & TUsuario & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, {}, TUsuario, "find", {}>;
    create(data: Partial<TUsuario>): Promise<import("mongoose").Document<unknown, {}, TUsuario, {}> & TUsuario & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    aprobar(id: string, estado: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, TUsuario, {}> & TUsuario & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, TUsuario, {}> & TUsuario & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, {}, TUsuario, "findOneAndUpdate", {}>;
}

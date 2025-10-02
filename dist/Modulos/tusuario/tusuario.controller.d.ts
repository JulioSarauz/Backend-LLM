import { TUsuarioService } from './tusuario.service';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
export declare class UsuarioController {
    private readonly adopcionesService;
    constructor(adopcionesService: TUsuarioService);
    findAll(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./tusuario.schema").TUsuario, {}> & import("./tusuario.schema").TUsuario & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, import("./tusuario.schema").TUsuario, {}> & import("./tusuario.schema").TUsuario & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, {}, import("./tusuario.schema").TUsuario, "find", {}>;
    create(body: CrearUsuarioDto): Promise<import("mongoose").Document<unknown, {}, import("./tusuario.schema").TUsuario, {}> & import("./tusuario.schema").TUsuario & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    aprobar(id: string, estado: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./tusuario.schema").TUsuario, {}> & import("./tusuario.schema").TUsuario & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("./tusuario.schema").TUsuario, {}> & import("./tusuario.schema").TUsuario & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, {}, import("./tusuario.schema").TUsuario, "findOneAndUpdate", {}>;
}

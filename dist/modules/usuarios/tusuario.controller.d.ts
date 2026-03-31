import { UsuariosService } from './usuarios.service';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { ActualizarUsuarioDto } from './dto/actualizar-usuario.dto';
export declare class UsuarioController {
    private readonly usuarioService;
    constructor(usuarioService: UsuariosService);
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/usuario.schema").Usuario, {}> & import("./schemas/usuario.schema").Usuario & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/usuario.schema").Usuario, {}> & import("./schemas/usuario.schema").Usuario & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    create(body: CrearUsuarioDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/usuario.schema").Usuario, {}> & import("./schemas/usuario.schema").Usuario & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    update(id: string, body: ActualizarUsuarioDto): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/usuario.schema").Usuario, {}> & import("./schemas/usuario.schema").Usuario & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    aprobar(id: string, estado: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/usuario.schema").Usuario, {}> & import("./schemas/usuario.schema").Usuario & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    remove(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/usuario.schema").Usuario, {}> & import("./schemas/usuario.schema").Usuario & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
}

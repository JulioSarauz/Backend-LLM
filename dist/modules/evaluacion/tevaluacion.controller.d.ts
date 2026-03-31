import { TEvaluacionService } from './tevaluacion.service';
import { CreateEvaluacionDto, AprobarEvaluacionDto } from './dto/crear-evaluacion.dto';
import { UsuariosService } from '../usuarios/usuarios.service';
export declare class EvaluacionController {
    private readonly tevaluacionService;
    private readonly usuariosService;
    constructor(tevaluacionService: TEvaluacionService, usuariosService: UsuariosService);
    findAll(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./tevaluacion.schema").TEvaluacion, {}> & import("./tevaluacion.schema").TEvaluacion & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, import("./tevaluacion.schema").TEvaluacion, {}> & import("./tevaluacion.schema").TEvaluacion & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, {}, import("./tevaluacion.schema").TEvaluacion, "find", {}>;
    create(body: CreateEvaluacionDto): Promise<import("mongoose").Document<unknown, {}, import("./tevaluacion.schema").TEvaluacion, {}> & import("./tevaluacion.schema").TEvaluacion & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    aprobar(id: string, body: AprobarEvaluacionDto): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./tevaluacion.schema").TEvaluacion, {}> & import("./tevaluacion.schema").TEvaluacion & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("./tevaluacion.schema").TEvaluacion, {}> & import("./tevaluacion.schema").TEvaluacion & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, {}, import("./tevaluacion.schema").TEvaluacion, "findOneAndUpdate", {}>;
    upload(req: any, files: Express.Multer.File[], body: any): Promise<{
        RespuestaModelo: any;
    }>;
}

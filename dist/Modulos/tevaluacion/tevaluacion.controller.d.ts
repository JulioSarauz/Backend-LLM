import { TEvaluacionService } from './tevaluacion.service';
export declare class EvaluacionController {
    private readonly tevaluacionService;
    constructor(tevaluacionService: TEvaluacionService);
    findAll(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./tevaluacion.schema").TEvaluacion, {}> & import("./tevaluacion.schema").TEvaluacion & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, import("./tevaluacion.schema").TEvaluacion, {}> & import("./tevaluacion.schema").TEvaluacion & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, {}, import("./tevaluacion.schema").TEvaluacion, "find", {}>;
    create(body: any): Promise<import("mongoose").Document<unknown, {}, import("./tevaluacion.schema").TEvaluacion, {}> & import("./tevaluacion.schema").TEvaluacion & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    aprobar(id: string, estado: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./tevaluacion.schema").TEvaluacion, {}> & import("./tevaluacion.schema").TEvaluacion & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("./tevaluacion.schema").TEvaluacion, {}> & import("./tevaluacion.schema").TEvaluacion & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, {}, import("./tevaluacion.schema").TEvaluacion, "findOneAndUpdate", {}>;
    upload(files: Express.Multer.File[], body: any): Promise<{
        RespuestaModelo: string;
    } | null>;
}

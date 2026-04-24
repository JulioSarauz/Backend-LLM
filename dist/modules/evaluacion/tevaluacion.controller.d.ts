import { TEvaluacionService } from './tevaluacion.service';
export declare class TEvaluacionController {
    private readonly tevaluacionService;
    constructor(tevaluacionService: TEvaluacionService);
    getHistorial(req: any): Promise<(import("mongoose").Document<unknown, {}, import("./tevaluacion.schema").TEvaluacionDocument, {}> & import("./tevaluacion.schema").TEvaluacion & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    evaluarCV(req: any, files: Express.Multer.File[], keywordsString: string): Promise<{
        RespuestaModelo: any;
    }>;
}

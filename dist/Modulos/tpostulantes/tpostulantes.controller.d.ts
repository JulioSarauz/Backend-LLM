import { TPostulanteService } from './tpostulantes.service';
export declare class MascotasController {
    private readonly tpostulanteService;
    constructor(tpostulanteService: TPostulanteService);
    findAll(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./tpostulantes.schema").TPostulante, {}> & import("./tpostulantes.schema").TPostulante & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, import("./tpostulantes.schema").TPostulante, {}> & import("./tpostulantes.schema").TPostulante & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, {}, import("./tpostulantes.schema").TPostulante, "find", {}>;
    findOne(id: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./tpostulantes.schema").TPostulante, {}> & import("./tpostulantes.schema").TPostulante & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("./tpostulantes.schema").TPostulante, {}> & import("./tpostulantes.schema").TPostulante & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, {}, import("./tpostulantes.schema").TPostulante, "findOne", {}>;
    create(body: any): Promise<import("mongoose").Document<unknown, {}, import("./tpostulantes.schema").TPostulante, {}> & import("./tpostulantes.schema").TPostulante & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    update(id: string, body: any): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./tpostulantes.schema").TPostulante, {}> & import("./tpostulantes.schema").TPostulante & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("./tpostulantes.schema").TPostulante, {}> & import("./tpostulantes.schema").TPostulante & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, {}, import("./tpostulantes.schema").TPostulante, "findOneAndUpdate", {}>;
    remove(id: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./tpostulantes.schema").TPostulante, {}> & import("./tpostulantes.schema").TPostulante & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("./tpostulantes.schema").TPostulante, {}> & import("./tpostulantes.schema").TPostulante & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, {}, import("./tpostulantes.schema").TPostulante, "findOneAndDelete", {}>;
}

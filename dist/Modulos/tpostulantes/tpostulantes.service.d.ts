import { Model } from 'mongoose';
import { TPostulante } from './tpostulantes.schema';
export declare class TPostulanteService {
    private tpostulanteModel;
    constructor(tpostulanteModel: Model<TPostulante>);
    findAll(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, TPostulante, {}> & TPostulante & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, TPostulante, {}> & TPostulante & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, {}, TPostulante, "find", {}>;
    findById(id: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, TPostulante, {}> & TPostulante & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, TPostulante, {}> & TPostulante & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, {}, TPostulante, "findOne", {}>;
    create(data: Partial<TPostulante>): Promise<import("mongoose").Document<unknown, {}, TPostulante, {}> & TPostulante & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    update(id: string, data: Partial<TPostulante>): import("mongoose").Query<(import("mongoose").Document<unknown, {}, TPostulante, {}> & TPostulante & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, TPostulante, {}> & TPostulante & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, {}, TPostulante, "findOneAndUpdate", {}>;
    delete(id: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, TPostulante, {}> & TPostulante & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, TPostulante, {}> & TPostulante & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }, {}, TPostulante, "findOneAndDelete", {}>;
}

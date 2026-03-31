import { SuscripcionesService } from './suscripciones.service';
import { ComprarPlanDto } from './dto/comprar-plan.dto';
export declare class SuscripcionesController {
    private readonly suscripcionesService;
    constructor(suscripcionesService: SuscripcionesService);
    comprarPlan(req: any, body: ComprarPlanDto): Promise<{
        mensaje: string;
        tokensActuales: number;
        planActual: string;
    }>;
}

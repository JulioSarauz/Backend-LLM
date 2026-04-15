import { PagosService } from './pagos.service';
import { CrearOrdenDto } from './dto/crear-orden.dto';
export declare class PagosController {
    private readonly pagosService;
    constructor(pagosService: PagosService);
    crearOrden(req: any, crearOrdenDto: CrearOrdenDto): Promise<{
        orderId: any;
        links: any;
    }>;
    capturarOrden(orderId: string): Promise<{
        success: boolean;
        message: string;
    }>;
}

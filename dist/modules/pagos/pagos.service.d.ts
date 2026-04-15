import { Model } from 'mongoose';
import { PaypalService } from './paypal.service';
import { TransaccionDocument } from './schemas/transaccion.schema';
import { CrearOrdenDto } from './dto/crear-orden.dto';
export declare class PagosService {
    private readonly paypalService;
    private transaccionModel;
    constructor(paypalService: PaypalService, transaccionModel: Model<TransaccionDocument>);
    crearOrden(dto: CrearOrdenDto): Promise<{
        orderId: any;
        links: any;
    }>;
    capturarOrden(orderId: string): Promise<{
        success: boolean;
        message: string;
    }>;
}

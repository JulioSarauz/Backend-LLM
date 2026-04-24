import { Model } from 'mongoose';
import { PaypalService } from './paypal.service';
import { TransaccionDocument } from './schemas/transaccion.schema';
import { CrearOrdenDto } from './dto/crear-orden.dto';
import { UsuarioDocument } from '../usuarios/schemas/usuario.schema';
export declare class PagosService {
    private readonly paypalService;
    private transaccionModel;
    private usuarioModel;
    constructor(paypalService: PaypalService, transaccionModel: Model<TransaccionDocument>, usuarioModel: Model<UsuarioDocument>);
    crearOrden(dto: CrearOrdenDto): Promise<{
        orderId: any;
        links: any;
    }>;
    capturarOrden(orderId: string): Promise<{
        success: boolean;
        message: string;
    }>;
}

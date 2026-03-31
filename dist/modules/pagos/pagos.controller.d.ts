import { RawBodyRequest } from '@nestjs/common';
import { PagosService } from './pagos.service';
import { Request } from 'express';
import { CrearCheckoutDto } from './dto/crear-checkout.dto';
export declare class PagosController {
    private readonly pagosService;
    constructor(pagosService: PagosService);
    crearCheckout(req: any, body: CrearCheckoutDto): Promise<{
        url: string | null;
    }>;
    manejarWebhook(req: RawBodyRequest<Request>, signature: string): Promise<{
        received: boolean;
    }>;
}

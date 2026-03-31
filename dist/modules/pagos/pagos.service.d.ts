import { RawBodyRequest } from '@nestjs/common';
import { Model } from 'mongoose';
import { Request } from 'express';
import { Pago } from './schemas/pago.schema';
import { UsuariosService } from '../usuarios/usuarios.service';
export declare class PagosService {
    private pagoModel;
    private usuariosService;
    private stripe;
    private readonly planes;
    constructor(pagoModel: Model<Pago>, usuariosService: UsuariosService);
    crearSesionCheckout(userId: string, email: string, planName: string): Promise<{
        url: string | null;
    }>;
    manejarWebhook(req: RawBodyRequest<Request>, signature: string): Promise<{
        received: boolean;
    }>;
}

import { UsuariosService } from '../usuarios/usuarios.service';
export declare class SuscripcionesService {
    private usuariosService;
    constructor(usuariosService: UsuariosService);
    private readonly planes;
    procesarCompra(userId: string, planName: string): Promise<{
        mensaje: string;
        tokensActuales: number;
        planActual: string;
    }>;
}

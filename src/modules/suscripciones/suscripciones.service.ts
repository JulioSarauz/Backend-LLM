import { Injectable, BadRequestException } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable()
export class SuscripcionesService {
  constructor(private usuariosService: UsuariosService) {}

  private readonly planes = {
    'Basico': 20,
    'Profesional': 100,
    'Corporativo': 500,
  };

  async procesarCompra(userId: string, planName: string) {
    const tokensAAgregar = this.planes[planName];
    
    if (!tokensAAgregar) {
      throw new BadRequestException('Plan inválido');
    }

    const usuarioActualizado = await this.usuariosService.updateTokens(userId, tokensAAgregar, planName);
    
    return {
      mensaje: `Plan ${planName} adquirido con éxito. Se añadieron ${tokensAAgregar} tokens.`,
      tokensActuales: usuarioActualizado.tokens,
      planActual: usuarioActualizado.plan
    };
  }
}
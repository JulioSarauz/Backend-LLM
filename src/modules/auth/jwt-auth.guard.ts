// src/modules/auth/jwt-auth.guard.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any) {
    // Si hay un error o no hay usuario, imprimimos el motivo real
    if (err || !user) {
      const motivo = info?.message || info?.name || 'Error desconocido';
      console.log('🔴 FALLO JWT DETECTADO:', motivo);
      throw err || new UnauthorizedException(`Fallo de Autenticación: ${motivo}`);
    }
    return user;
  }
}
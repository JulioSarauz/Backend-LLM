import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // Inyectamos ConfigService en el constructor
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // Obtenemos el secreto de forma segura
      secretOrKey: configService.get<string>('JWT_SECRET') || 'super-secret-key',
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email, tokens: payload.tokens };
  }
}
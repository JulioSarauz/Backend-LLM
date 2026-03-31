import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID || 'TU_CLIENT_ID',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'TU_CLIENT_SECRET',
      callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { id, name, emails } = profile;
    const usuario = await this.authService.validateOAuthLogin({
      googleId: id,
      email: emails[0].value,
      nombres: `${name.givenName} ${name.familyName}`,
    });
    done(null, usuario);
  }
}
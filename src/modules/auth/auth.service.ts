import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto, LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService
  ) {}

  async register(registerDto: RegisterDto) {
    const userExists = await this.usuariosService.findByEmail(registerDto.email);
    if (userExists) {
      throw new UnauthorizedException('El usuario ya existe');
    }
    
    const password = registerDto.password || ''; 
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await this.usuariosService.create({
      ...registerDto,
      password: hashedPassword,
    });
    return this.generateToken(user);
  }

  async login(loginDto: LoginDto) {
    const user = await this.usuariosService.findByEmail(loginDto.email);
    if (!user || !user.password) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    
    const password = loginDto.password || '';
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    return this.generateToken(user);
  }

  async validateOAuthLogin(profile: any) {
    let user:any = await this.usuariosService.findByGoogleId(profile.googleId);
    if (!user) {
      user = await this.usuariosService.findByEmail(profile.email);
      if (user) {
        user.googleId = profile.googleId;
        await user.save();
      } else {
        user = await this.usuariosService.create({
          email: profile.email,
          nombres: profile.nombres,
          googleId: profile.googleId,
        });
      }
    }
    return user;
  }

  generateToken(user: any) {
    const payload = { email: user.email, sub: user._id, tokens: user.tokens };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user._id,
        email: user.email,
        nombres: user.nombres,
        tokens: user.tokens
      }
    };
  }

  async getUsuarioProfile(userId: string) {
    const user = await this.usuariosService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }
    return {
      id: (user as any)._id,
      email: user.email,
      nombres: user.nombres,
      tokens: user.tokens,
      plan: user.plan
    };
  }
}
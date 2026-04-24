import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
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
    let user: any = await this.usuariosService.findByEmail(registerDto.email);
    
    if (user) {
      if (user.googleId) {
        throw new BadRequestException('Este correo usa Google. Ve a Iniciar Sesión.');
      }
      // Si ya está verificado, no dejamos registrar
      if (user.isVerified || user.isVerified === undefined) { 
        throw new BadRequestException('El correo ya está registrado y verificado. Por favor, inicia sesión.');
      }
      // Si existe pero NO está verificado, sobreescribiremos su OTP más abajo
    }
    
    // Generar OTP de 6 dígitos
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date();
    // El código expira en 10 minutos
    expiry.setMinutes(expiry.getMinutes() + 10); 
    
    const hashedPassword = await bcrypt.hash(registerDto.password || '', 10);
    
    if (user) {
      // Actualizar usuario no verificado existente
      user.password = hashedPassword;
      user.nombres = registerDto.nombres;
      user.otp = otpCode;
      user.otpExpires = expiry;
      await user.save();
    } else {
      // Crear usuario nuevo no verificado
      user = await this.usuariosService.create({
        ...registerDto,
        password: hashedPassword,
        isVerified: false,
        otp: otpCode,
        otpExpires: expiry
      });
    }

    // AQUI ENVIARIAS EL EMAIL REAL (Nodemailer, SendGrid, Resend, etc)
    console.log('\n=============================================');
    console.log(`✉️ SIMULACIÓN DE EMAIL ENVIADO A: ${user.email}`);
    console.log(`🔑 TU CÓDIGO OTP ES: ${otpCode}`);
    console.log('=============================================\n');

    return { message: 'Código enviado al correo', email: user.email };
  }

  async verifyOtp(email: string, otp: string) {
    const user: any = await this.usuariosService.findByEmail(email);
    
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }
    if (user.isVerified) {
      throw new BadRequestException('La cuenta ya está verificada');
    }
    if (user.otp !== otp) {
      throw new UnauthorizedException('El código OTP es incorrecto');
    }
    if (new Date() > new Date(user.otpExpires)) {
      throw new UnauthorizedException('El código ha expirado. Regístrate de nuevo.');
    }

    // Verificación exitosa
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    // Ahora sí devolvemos el Token JWT
    return this.generateToken(user);
  }

  async login(loginDto: LoginDto) {
    const user: any = await this.usuariosService.findByEmail(loginDto.email);
    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    if (!user.password) {
      if (user.googleId) {
        throw new UnauthorizedException('Esta cuenta usa Google. Por favor, haz clic en "Continuar con Google".');
      }
      throw new UnauthorizedException('Credenciales inválidas');
    }
    
    // BLOQUEO: Si no está verificado, no puede loguearse
    if (user.isVerified === false) {
      throw new UnauthorizedException('Tu cuenta no ha sido verificada. Debes completar el registro.');
    }
    
    const password = loginDto.password || '';
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Credenciales inválidas');
    
    return this.generateToken(user);
  }

  async validateOAuthLogin(profile: any) {
    let user:any = await this.usuariosService.findByGoogleId(profile.googleId);
    if (!user) {
      user = await this.usuariosService.findByEmail(profile.email);
      if (user) {
        user.googleId = profile.googleId;
        user.isVerified = true; // Cuentas de Google ya vienen verificadas
        await user.save();
      } else {
        user = await this.usuariosService.create({
          email: profile.email,
          nombres: profile.nombres,
          googleId: profile.googleId,
          isVerified: true // Cuentas de Google ya vienen verificadas
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
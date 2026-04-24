import { Controller, Post, Body, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    console.log('[Auth Controller] -> Petición de REGISTRO entrante:', registerDto);
    const result = await this.authService.register(registerDto);
    console.log('[Auth Controller] <- Respuesta de REGISTRO generada:', result);
    return result;
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    console.log('[Auth Controller] -> Petición de LOGIN entrante. Email:', loginDto.email);
    console.log('[Auth Controller] -> Datos completos (Body):', loginDto);
    
    // Si la contraseña falla, el servicio lanzará la excepción antes del siguiente console.log
    const result = await this.authService.login(loginDto);
    
    console.log('[Auth Controller] <- Respuesta de LOGIN generada con éxito (Token creado).');
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req) {
    console.log('[Auth Controller] -> Petición de PROFILE entrante. Datos del Token (req.user):', req.user);
    
    const userId = req.user.userId || req.user.id || req.user.sub;
    console.log('[Auth Controller] -> ID de usuario extraído:', userId);
    
    const profile = await this.authService.getUsuarioProfile(userId);
    console.log('[Auth Controller] <- Perfil devuelto desde DB:', profile);
    return profile;
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    console.log('[Auth Controller] -> Iniciando redirección a Google OAuth...');
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    console.log('[Auth Controller] -> Callback de Google recibido. Perfil extraído:', req.user);
    
    const { access_token } = this.authService.generateToken(req.user);
    console.log('[Auth Controller] <- JWT Generado tras OAuth:', access_token);
    
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:4200';
    console.log(`[Auth Controller] <- Redirigiendo al frontend: ${frontendUrl}/login?token=...`);
    
    res.redirect(`${frontendUrl}/login?token=${access_token}`);
  }

  // Añade este endpoint en tu auth.controller.ts (debajo del @Post('register'))
  @Post('verify-otp')
  async verifyOtp(@Body() body: { email: string, otp: string }) {
    console.log(`[Auth Controller] -> Verificando OTP para ${body.email}`);
    const result = await this.authService.verifyOtp(body.email, body.otp);
    console.log('[Auth Controller] <- OTP Correcto. Token generado.');
    return result;
  }
}
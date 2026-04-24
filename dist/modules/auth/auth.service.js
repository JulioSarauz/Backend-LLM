"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const usuarios_service_1 = require("../usuarios/usuarios.service");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
let AuthService = class AuthService {
    usuariosService;
    jwtService;
    constructor(usuariosService, jwtService) {
        this.usuariosService = usuariosService;
        this.jwtService = jwtService;
    }
    async register(registerDto) {
        let user = await this.usuariosService.findByEmail(registerDto.email);
        if (user) {
            if (user.googleId) {
                throw new common_1.BadRequestException('Este correo usa Google. Ve a Iniciar Sesión.');
            }
            if (user.isVerified || user.isVerified === undefined) {
                throw new common_1.BadRequestException('El correo ya está registrado y verificado. Por favor, inicia sesión.');
            }
        }
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        const expiry = new Date();
        expiry.setMinutes(expiry.getMinutes() + 10);
        const hashedPassword = await bcrypt.hash(registerDto.password || '', 10);
        if (user) {
            user.password = hashedPassword;
            user.nombres = registerDto.nombres;
            user.otp = otpCode;
            user.otpExpires = expiry;
            await user.save();
        }
        else {
            user = await this.usuariosService.create({
                ...registerDto,
                password: hashedPassword,
                isVerified: false,
                otp: otpCode,
                otpExpires: expiry
            });
        }
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.CORREO_SEND_MAIL,
                pass: process.env.CLAVE_SEND_MAIL
            }
        });
        await transporter.sendMail({
            from: `"ResumeAnalyzer IA" <${process.env.CORREO_SEND_MAIL}>`,
            to: user.email,
            subject: 'Tu código de acceso - ResumeAnalyzer IA',
            html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #07080f; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff;">
          
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #07080f; padding: 40px 20px;">
            <tr>
              <td align="center">
                
                <table width="100%" max-width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #0a0b16; border: 1px solid #1f2133; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
                  
                  <tr>
                    <td align="center" style="padding: 40px 40px 20px 40px;">
                      <div style="background-color: #5b6af0; width: 60px; height: 60px; border-radius: 16px; display: inline-block; line-height: 60px; font-size: 24px; font-weight: bold; color: #ffffff; text-align: center; margin-bottom: 20px;">
                        RA
                      </div>
                      <h1 style="margin: 0; font-size: 28px; font-weight: 900; color: #ffffff; letter-spacing: -0.5px;">ResumeAnalyzer <span style="color: #00e5c0;">IA</span></h1>
                      <p style="margin: 10px 0 0 0; font-size: 14px; color: #8a8d9e; text-transform: uppercase; letter-spacing: 2px; font-weight: bold;">Motor de Selección Inteligente</p>
                    </td>
                  </tr>

                  <tr>
                    <td align="center" style="padding: 20px 40px 40px 40px;">
                      <p style="margin: 0 0 30px 0; font-size: 16px; line-height: 24px; color: #b4b6c4;">
                        Hola <strong>${registerDto.nombres}</strong>,<br><br>
                        Estás a un paso de acceder a la plataforma. Usa el siguiente código de un solo uso (OTP) para verificar tu identidad y activar tu cuenta.
                      </p>

                      <div style="background-color: #12142b; border: 2px dashed #5b6af0; border-radius: 16px; padding: 30px 20px; margin: 0 auto; max-width: 300px;">
                        <p style="margin: 0 0 10px 0; font-size: 12px; color: #8a8d9e; text-transform: uppercase; font-weight: bold; letter-spacing: 1px;">CÓDIGO DE ACCESO</p>
                        <h2 style="margin: 0; font-size: 42px; font-weight: 900; color: #00e5c0; letter-spacing: 8px;">${otpCode}</h2>
                      </div>

                      <p style="margin: 30px 0 0 0; font-size: 14px; color: #ff5c7a; font-weight: 600;">
                        ⏱️ Este código expira en exactamente 10 minutos.
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td align="center" style="padding: 30px 40px; background-color: #05060a; border-top: 1px solid #1f2133;">
                      <p style="margin: 0; font-size: 12px; color: #55576a; line-height: 18px;">
                        Si no solicitaste este registro, puedes ignorar este correo de forma segura.<br>
                        © 2026 ResumeAnalyzer IA. Todos los derechos reservados.
                      </p>
                    </td>
                  </tr>

                </table>

              </td>
            </tr>
          </table>

        </body>
        </html>
      `
        });
        return { message: 'Código enviado al correo', email: user.email };
    }
    async verifyOtp(email, otp) {
        const user = await this.usuariosService.findByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException('Usuario no encontrado');
        }
        if (user.isVerified) {
            throw new common_1.BadRequestException('La cuenta ya está verificada');
        }
        if (user.otp !== otp) {
            throw new common_1.UnauthorizedException('El código OTP es incorrecto');
        }
        if (new Date() > new Date(user.otpExpires)) {
            throw new common_1.UnauthorizedException('El código ha expirado. Regístrate de nuevo.');
        }
        user.isVerified = true;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();
        return this.generateToken(user);
    }
    async login(loginDto) {
        const user = await this.usuariosService.findByEmail(loginDto.email);
        if (!user)
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        if (!user.password) {
            if (user.googleId) {
                throw new common_1.UnauthorizedException('Esta cuenta usa Google. Por favor, haz clic en "Continuar con Google".');
            }
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        if (user.isVerified === false) {
            throw new common_1.UnauthorizedException('Tu cuenta no ha sido verificada. Debes completar el registro.');
        }
        const password = loginDto.password || '';
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        return this.generateToken(user);
    }
    async validateOAuthLogin(profile) {
        let user = await this.usuariosService.findByGoogleId(profile.googleId);
        if (!user) {
            user = await this.usuariosService.findByEmail(profile.email);
            if (user) {
                user.googleId = profile.googleId;
                user.isVerified = true;
                await user.save();
            }
            else {
                user = await this.usuariosService.create({
                    email: profile.email,
                    nombres: profile.nombres,
                    googleId: profile.googleId,
                    isVerified: true
                });
            }
        }
        return user;
    }
    generateToken(user) {
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
    async getUsuarioProfile(userId) {
        const user = await this.usuariosService.findById(userId);
        if (!user) {
            throw new common_1.UnauthorizedException('Usuario no encontrado');
        }
        return {
            id: user._id,
            email: user.email,
            nombres: user.nombres,
            tokens: user.tokens,
            plan: user.plan
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [usuarios_service_1.UsuariosService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
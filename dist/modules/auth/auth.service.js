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
        console.log('\n=============================================');
        console.log(`✉️ SIMULACIÓN DE EMAIL ENVIADO A: ${user.email}`);
        console.log(`🔑 TU CÓDIGO OTP ES: ${otpCode}`);
        console.log('=============================================\n');
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
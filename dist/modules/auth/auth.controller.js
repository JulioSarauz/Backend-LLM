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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_dto_1 = require("./dto/auth.dto");
const passport_1 = require("@nestjs/passport");
const jwt_auth_guard_1 = require("./jwt-auth.guard");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async register(registerDto) {
        console.log('[Auth Controller] -> Petición de REGISTRO entrante:', registerDto);
        const result = await this.authService.register(registerDto);
        console.log('[Auth Controller] <- Respuesta de REGISTRO generada:', result);
        return result;
    }
    async login(loginDto) {
        console.log('[Auth Controller] -> Petición de LOGIN entrante. Email:', loginDto.email);
        console.log('[Auth Controller] -> Datos completos (Body):', loginDto);
        const result = await this.authService.login(loginDto);
        console.log('[Auth Controller] <- Respuesta de LOGIN generada con éxito (Token creado).');
        return result;
    }
    async getProfile(req) {
        console.log('[Auth Controller] -> Petición de PROFILE entrante. Datos del Token (req.user):', req.user);
        const userId = req.user.userId || req.user.id || req.user.sub;
        console.log('[Auth Controller] -> ID de usuario extraído:', userId);
        const profile = await this.authService.getUsuarioProfile(userId);
        console.log('[Auth Controller] <- Perfil devuelto desde DB:', profile);
        return profile;
    }
    async googleAuth(req) {
        console.log('[Auth Controller] -> Iniciando redirección a Google OAuth...');
    }
    async googleAuthRedirect(req, res) {
        console.log('[Auth Controller] -> Callback de Google recibido. Perfil extraído:', req.user);
        const { access_token } = this.authService.generateToken(req.user);
        console.log('[Auth Controller] <- JWT Generado tras OAuth:', access_token);
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:4200';
        console.log(`[Auth Controller] <- Redirigiendo al frontend: ${frontendUrl}/login?token=...`);
        res.redirect(`${frontendUrl}/login?token=${access_token}`);
    }
    async verifyOtp(body) {
        console.log(`[Auth Controller] -> Verificando OTP para ${body.email}`);
        const result = await this.authService.verifyOtp(body.email, body.otp);
        console.log('[Auth Controller] <- OTP Correcto. Token generado.');
        return result;
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)('google'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuth", null);
__decorate([
    (0, common_1.Get)('google/callback'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuthRedirect", null);
__decorate([
    (0, common_1.Post)('verify-otp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyOtp", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map
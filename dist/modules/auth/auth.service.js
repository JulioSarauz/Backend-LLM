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
        const userExists = await this.usuariosService.findByEmail(registerDto.email);
        if (userExists) {
            throw new common_1.UnauthorizedException('El usuario ya existe');
        }
        const password = registerDto.password || '';
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.usuariosService.create({
            ...registerDto,
            password: hashedPassword,
        });
        return this.generateToken(user);
    }
    async login(loginDto) {
        const user = await this.usuariosService.findByEmail(loginDto.email);
        if (!user || !user.password) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        const password = loginDto.password || '';
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        return this.generateToken(user);
    }
    async validateOAuthLogin(profile) {
        let user = await this.usuariosService.findByGoogleId(profile.googleId);
        if (!user) {
            user = await this.usuariosService.findByEmail(profile.email);
            if (user) {
                user.googleId = profile.googleId;
                await user.save();
            }
            else {
                user = await this.usuariosService.create({
                    email: profile.email,
                    nombres: profile.nombres,
                    googleId: profile.googleId,
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
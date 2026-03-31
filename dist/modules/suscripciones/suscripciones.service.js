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
exports.SuscripcionesService = void 0;
const common_1 = require("@nestjs/common");
const usuarios_service_1 = require("../usuarios/usuarios.service");
let SuscripcionesService = class SuscripcionesService {
    usuariosService;
    constructor(usuariosService) {
        this.usuariosService = usuariosService;
    }
    planes = {
        'Basico': 20,
        'Profesional': 100,
        'Corporativo': 500,
    };
    async procesarCompra(userId, planName) {
        const tokensAAgregar = this.planes[planName];
        if (!tokensAAgregar) {
            throw new common_1.BadRequestException('Plan inválido');
        }
        const usuarioActualizado = await this.usuariosService.updateTokens(userId, tokensAAgregar, planName);
        return {
            mensaje: `Plan ${planName} adquirido con éxito. Se añadieron ${tokensAAgregar} tokens.`,
            tokensActuales: usuarioActualizado.tokens,
            planActual: usuarioActualizado.plan
        };
    }
};
exports.SuscripcionesService = SuscripcionesService;
exports.SuscripcionesService = SuscripcionesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [usuarios_service_1.UsuariosService])
], SuscripcionesService);
//# sourceMappingURL=suscripciones.service.js.map
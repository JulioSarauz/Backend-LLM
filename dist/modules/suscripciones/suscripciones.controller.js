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
exports.SuscripcionesController = void 0;
const common_1 = require("@nestjs/common");
const suscripciones_service_1 = require("./suscripciones.service");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const comprar_plan_dto_1 = require("./dto/comprar-plan.dto");
let SuscripcionesController = class SuscripcionesController {
    suscripcionesService;
    constructor(suscripcionesService) {
        this.suscripcionesService = suscripcionesService;
    }
    comprarPlan(req, body) {
        return this.suscripcionesService.procesarCompra(req.user.userId, body.plan);
    }
};
exports.SuscripcionesController = SuscripcionesController;
__decorate([
    (0, common_1.Post)('comprar'),
    (0, swagger_1.ApiOperation)({ summary: 'Procesa la compra de un plan y asigna los tokens al usuario logueado.' }),
    (0, swagger_1.ApiBody)({ type: comprar_plan_dto_1.ComprarPlanDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, comprar_plan_dto_1.ComprarPlanDto]),
    __metadata("design:returntype", void 0)
], SuscripcionesController.prototype, "comprarPlan", null);
exports.SuscripcionesController = SuscripcionesController = __decorate([
    (0, swagger_1.ApiTags)('Suscripciones'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('suscripciones'),
    __metadata("design:paramtypes", [suscripciones_service_1.SuscripcionesService])
], SuscripcionesController);
//# sourceMappingURL=suscripciones.controller.js.map
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
exports.AdopcionesController = void 0;
const common_1 = require("@nestjs/common");
const tusuario_service_1 = require("./tusuario.service");
let AdopcionesController = class AdopcionesController {
    adopcionesService;
    constructor(adopcionesService) {
        this.adopcionesService = adopcionesService;
    }
    findAll() {
        return this.adopcionesService.findAll();
    }
    create(body) {
        return this.adopcionesService.create(body);
    }
    aprobar(id, estado) {
        return this.adopcionesService.aprobar(id, estado);
    }
};
exports.AdopcionesController = AdopcionesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdopcionesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdopcionesController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id/aprobar'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('estado')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AdopcionesController.prototype, "aprobar", null);
exports.AdopcionesController = AdopcionesController = __decorate([
    (0, common_1.Controller)('usuario'),
    __metadata("design:paramtypes", [tusuario_service_1.TUsuarioService])
], AdopcionesController);
//# sourceMappingURL=tusuario.controller.js.map
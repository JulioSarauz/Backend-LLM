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
exports.PostulantesController = void 0;
const common_1 = require("@nestjs/common");
const tpostulantes_service_1 = require("./tpostulantes.service");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
let PostulantesController = class PostulantesController {
    tpostulanteService;
    constructor(tpostulanteService) {
        this.tpostulanteService = tpostulanteService;
    }
    findAll() {
        return this.tpostulanteService.findAll();
    }
    findOne(id) {
        return this.tpostulanteService.findById(id);
    }
    create(body) {
        return this.tpostulanteService.create(body);
    }
    update(id, body) {
        return this.tpostulanteService.update(id, body);
    }
    remove(id) {
        return this.tpostulanteService.delete(id);
    }
};
exports.PostulantesController = PostulantesController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtiene el listado completo de postulantes' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de postulantes retornada con éxito.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PostulantesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtiene la información de un postulante por su ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string', description: 'ID único del postulante' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Postulante encontrado.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PostulantesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crea un nuevo registro de postulante' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Postulante creado con éxito.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostulantesController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualiza la información de un postulante' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string', description: 'ID único del postulante' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Postulante actualizado con éxito.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PostulantesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Elimina un postulante del sistema' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string', description: 'ID único del postulante a eliminar' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Postulante eliminado con éxito.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PostulantesController.prototype, "remove", null);
exports.PostulantesController = PostulantesController = __decorate([
    (0, swagger_1.ApiTags)('Postulantes'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('postulante'),
    __metadata("design:paramtypes", [tpostulantes_service_1.TPostulanteService])
], PostulantesController);
//# sourceMappingURL=tpostulantes.controller.js.map
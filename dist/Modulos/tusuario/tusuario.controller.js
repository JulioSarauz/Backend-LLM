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
exports.UsuarioController = void 0;
const common_1 = require("@nestjs/common");
const tusuario_service_1 = require("./tusuario.service");
const swagger_1 = require("@nestjs/swagger");
const crear_usuario_dto_1 = require("./dto/crear-usuario.dto");
const actualizar_estado_dto_1 = require("./dto/actualizar-estado.dto");
let UsuarioController = class UsuarioController {
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
exports.UsuarioController = UsuarioController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtiene la lista completa de todos los usuarios/solicitudes de adopción.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de usuarios obtenida exitosamente.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crea un nuevo registro de usuario o solicitud de adopción.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'El registro ha sido creado exitosamente.'
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Datos de entrada inválidos.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crear_usuario_dto_1.CrearUsuarioDto]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id/aprobar'),
    (0, swagger_1.ApiOperation)({ summary: 'Aprueba o rechaza una solicitud de usuario/adopción por su ID.' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: 'string',
        description: 'El ID único del usuario o solicitud a modificar.'
    }),
    (0, swagger_1.ApiBody)({
        type: actualizar_estado_dto_1.ActualizarEstadoDto,
        description: 'Objeto que contiene el nuevo estado (ej: "Aprobado", "Rechazado").'
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'El estado del registro fue actualizado.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Usuario/Solicitud no encontrada.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('estado')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "aprobar", null);
exports.UsuarioController = UsuarioController = __decorate([
    (0, swagger_1.ApiTags)('Usuarios'),
    (0, common_1.Controller)('usuario'),
    __metadata("design:paramtypes", [tusuario_service_1.TUsuarioService])
], UsuarioController);
//# sourceMappingURL=tusuario.controller.js.map
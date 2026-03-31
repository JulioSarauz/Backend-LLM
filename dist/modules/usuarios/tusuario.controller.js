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
const usuarios_service_1 = require("./usuarios.service");
const swagger_1 = require("@nestjs/swagger");
const crear_usuario_dto_1 = require("./dto/crear-usuario.dto");
const actualizar_estado_dto_1 = require("./dto/actualizar-estado.dto");
const actualizar_usuario_dto_1 = require("./dto/actualizar-usuario.dto");
const passport_1 = require("@nestjs/passport");
let UsuarioController = class UsuarioController {
    usuarioService;
    constructor(usuarioService) {
        this.usuarioService = usuarioService;
    }
    findAll() {
        return this.usuarioService.findAll();
    }
    findOne(id) {
        return this.usuarioService.findOne(id);
    }
    create(body) {
        return this.usuarioService.create(body);
    }
    update(id, body) {
        return this.usuarioService.update(id, body);
    }
    aprobar(id, estado) {
        return this.usuarioService.aprobar(id, estado);
    }
    remove(id) {
        return this.usuarioService.remove(id);
    }
};
exports.UsuarioController = UsuarioController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtiene la lista completa de analistas y reclutadores.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de usuarios obtenida exitosamente.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtiene la información de un usuario específico por su ID.' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string', description: 'ID único del usuario en MongoDB.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Usuario encontrado exitosamente.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Usuario no encontrado.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crea un nuevo registro de analista o reclutador.' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'El usuario ha sido creado exitosamente.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Datos de entrada inválidos o el correo ya existe.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crear_usuario_dto_1.CrearUsuarioDto]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualiza la información general de un usuario (nombres, roles, etc.).' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string', description: 'El ID único del usuario a modificar.' }),
    (0, swagger_1.ApiBody)({ type: actualizar_usuario_dto_1.ActualizarUsuarioDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Usuario actualizado exitosamente.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, actualizar_usuario_dto_1.ActualizarUsuarioDto]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/aprobar'),
    (0, swagger_1.ApiOperation)({ summary: 'Habilita o deshabilita el acceso de un usuario al sistema.' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string', description: 'El ID único del usuario a modificar.' }),
    (0, swagger_1.ApiBody)({ type: actualizar_estado_dto_1.ActualizarEstadoDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'El estado del usuario fue actualizado.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Usuario no encontrado.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('estado')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "aprobar", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Elimina lógicamente a un usuario del sistema.' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'string', description: 'El ID único del usuario a eliminar.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Usuario eliminado exitosamente.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "remove", null);
exports.UsuarioController = UsuarioController = __decorate([
    (0, swagger_1.ApiTags)('Usuarios'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('usuario'),
    __metadata("design:paramtypes", [usuarios_service_1.UsuariosService])
], UsuarioController);
//# sourceMappingURL=tusuario.controller.js.map
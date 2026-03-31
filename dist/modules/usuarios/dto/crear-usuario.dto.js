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
exports.CrearUsuarioDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CrearUsuarioDto {
    email;
    nombres;
    cargo;
    estado;
}
exports.CrearUsuarioDto = CrearUsuarioDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'j.sarauz@29deoctubre.fin.ec', description: 'Correo corporativo del usuario' }),
    __metadata("design:type", String)
], CrearUsuarioDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Julio Sarauz', description: 'Nombres completos' }),
    __metadata("design:type", String)
], CrearUsuarioDto.prototype, "nombres", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Analista de Talento Humano', description: 'Cargo o rol' }),
    __metadata("design:type", String)
], CrearUsuarioDto.prototype, "cargo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Activo', enum: ['Activo', 'Inactivo'], description: 'Estado inicial del usuario' }),
    __metadata("design:type", String)
], CrearUsuarioDto.prototype, "estado", void 0);
//# sourceMappingURL=crear-usuario.dto.js.map
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
const class_validator_1 = require("class-validator");
class CrearUsuarioDto {
    nombre;
    correoinstitucional;
    cargo;
}
exports.CrearUsuarioDto = CrearUsuarioDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nombre completo del solicitante. (Requerido)',
        example: 'Juan Pérez'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CrearUsuarioDto.prototype, "nombre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Correo electrónico institucional.',
        example: 'juan.perez@ejemplo.com',
        required: false
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CrearUsuarioDto.prototype, "correoinstitucional", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Cargo o posición del solicitante.',
        example: 'Gerente de Proyectos',
        required: false
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CrearUsuarioDto.prototype, "cargo", void 0);
//# sourceMappingURL=crear-usuario.dto.js.map
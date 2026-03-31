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
exports.EvaluarCvDto = exports.AprobarEvaluacionDto = exports.CreateEvaluacionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateEvaluacionDto {
    estado;
    fecharegistro;
    responsable;
    fktpostulante;
}
exports.CreateEvaluacionDto = CreateEvaluacionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Pendiente', description: 'Estado actual de la evaluación' }),
    __metadata("design:type", String)
], CreateEvaluacionDto.prototype, "estado", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-03-31T10:00:00Z', description: 'Fecha en la que se registró el análisis' }),
    __metadata("design:type", String)
], CreateEvaluacionDto.prototype, "fecharegistro", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Julio Sarauz', description: 'Reclutador responsable del análisis' }),
    __metadata("design:type", String)
], CreateEvaluacionDto.prototype, "responsable", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '65f1a2b3c4d5e6f7a8b9c0d1', description: 'ID de Mongo del postulante asociado' }),
    __metadata("design:type", String)
], CreateEvaluacionDto.prototype, "fktpostulante", void 0);
class AprobarEvaluacionDto {
    estado;
}
exports.AprobarEvaluacionDto = AprobarEvaluacionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Aprobado', enum: ['Aprobado', 'Rechazado', 'En Revisión'], description: 'Nuevo estado de la evaluación' }),
    __metadata("design:type", String)
], AprobarEvaluacionDto.prototype, "estado", void 0);
class EvaluarCvDto {
    keywords;
    files;
}
exports.EvaluarCvDto = EvaluarCvDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '["React", "NestJS", "Microservicios", "Liderazgo"]', description: 'Arreglo de palabras clave en formato string JSON para evaluar' }),
    __metadata("design:type", String)
], EvaluarCvDto.prototype, "keywords", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary', description: 'Archivos PDF de las hojas de vida', isArray: true }),
    __metadata("design:type", Array)
], EvaluarCvDto.prototype, "files", void 0);
//# sourceMappingURL=crear-evaluacion.dto.js.map
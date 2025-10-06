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
exports.CrearEvaluacionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CrearEvaluacionDto {
    resultado;
    fktpostulante;
}
exports.CrearEvaluacionDto = CrearEvaluacionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'El resultado inicial de la evaluación o un resumen.',
        example: 'Pendiente de análisis'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CrearEvaluacionDto.prototype, "resultado", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID del postulante al que pertenece esta evaluación (Foreign Key).',
        example: '60c72b1f9b1d9c001f8e4c9a'
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CrearEvaluacionDto.prototype, "fktpostulante", void 0);
//# sourceMappingURL=crear-evaluacion.dto.js.map
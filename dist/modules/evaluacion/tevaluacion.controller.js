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
exports.EvaluacionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const tevaluacion_service_1 = require("./tevaluacion.service");
const platform_express_1 = require("@nestjs/platform-express");
const crear_evaluacion_dto_1 = require("./dto/crear-evaluacion.dto");
const pdfParse = require("pdf-parse");
const passport_1 = require("@nestjs/passport");
const usuarios_service_1 = require("../usuarios/usuarios.service");
let EvaluacionController = class EvaluacionController {
    tevaluacionService;
    usuariosService;
    constructor(tevaluacionService, usuariosService) {
        this.tevaluacionService = tevaluacionService;
        this.usuariosService = usuariosService;
    }
    findAll() {
        return this.tevaluacionService.findAll();
    }
    create(body) {
        return this.tevaluacionService.create(body);
    }
    aprobar(id, body) {
        return this.tevaluacionService.aprobar(id, body.estado);
    }
    async upload(req, files, body) {
        const COSTO_POR_ANALISIS = 5;
        await this.usuariosService.deducirTokensParaAnalisis(req.user.userId, COSTO_POR_ANALISIS);
        try {
            const keywords = typeof body.keywords === 'string'
                ? JSON.parse(body.keywords)
                : body.keywords;
            if (!files || files.length === 0) {
                throw new common_1.BadRequestException('No se subió ningún archivo');
            }
            let content = '';
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const pdfContent = await pdfParse(file.buffer);
                const lector = pdfContent.text;
                content += this.tevaluacionService.ObtenerContenido(lector, i) + '\n';
            }
            return await this.tevaluacionService.evaluateResumeCHATGPT(content, keywords);
        }
        catch (error) {
            await this.usuariosService.reembolsarTokens(req.user.userId, COSTO_POR_ANALISIS);
            throw error;
        }
    }
};
exports.EvaluacionController = EvaluacionController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Obtiene el listado completo de evaluaciones' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de evaluaciones retornada con éxito.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EvaluacionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Crea un registro manual de evaluación' }),
    (0, swagger_1.ApiBody)({ type: crear_evaluacion_dto_1.CreateEvaluacionDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [crear_evaluacion_dto_1.CreateEvaluacionDto]),
    __metadata("design:returntype", void 0)
], EvaluacionController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id/aprobar'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualiza el estado de una evaluación (Aprobar/Rechazar)' }),
    (0, swagger_1.ApiBody)({ type: crear_evaluacion_dto_1.AprobarEvaluacionDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, crear_evaluacion_dto_1.AprobarEvaluacionDto]),
    __metadata("design:returntype", void 0)
], EvaluacionController.prototype, "aprobar", null);
__decorate([
    (0, common_1.Post)('evaluar'),
    (0, swagger_1.ApiOperation)({ summary: 'Analiza múltiples CVs usando IA. Costo: 5 Tokens.' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({ type: crear_evaluacion_dto_1.EvaluarCvDto }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array, Object]),
    __metadata("design:returntype", Promise)
], EvaluacionController.prototype, "upload", null);
exports.EvaluacionController = EvaluacionController = __decorate([
    (0, swagger_1.ApiTags)('Evaluacion'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.Controller)('evaluacion'),
    __metadata("design:paramtypes", [tevaluacion_service_1.TEvaluacionService,
        usuarios_service_1.UsuariosService])
], EvaluacionController);
//# sourceMappingURL=tevaluacion.controller.js.map
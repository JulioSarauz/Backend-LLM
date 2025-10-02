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
const tevaluacion_service_1 = require("./tevaluacion.service");
const platform_express_1 = require("@nestjs/platform-express");
const pdfParse = require("pdf-parse");
let EvaluacionController = class EvaluacionController {
    tevaluacionService;
    constructor(tevaluacionService) {
        this.tevaluacionService = tevaluacionService;
    }
    findAll() {
        return this.tevaluacionService.findAll();
    }
    create(body) {
        return this.tevaluacionService.create(body);
    }
    aprobar(id, estado) {
        return this.tevaluacionService.aprobar(id, estado);
    }
    async upload(files, body) {
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
        return this.tevaluacionService.evaluateResumeCHATGPT(content, keywords);
    }
};
exports.EvaluacionController = EvaluacionController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EvaluacionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EvaluacionController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id/aprobar'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('estado')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], EvaluacionController.prototype, "aprobar", null);
__decorate([
    (0, common_1.Post)('evaluar'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files')),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], EvaluacionController.prototype, "upload", null);
exports.EvaluacionController = EvaluacionController = __decorate([
    (0, common_1.Controller)('evaluacion'),
    __metadata("design:paramtypes", [tevaluacion_service_1.TEvaluacionService])
], EvaluacionController);
//# sourceMappingURL=tevaluacion.controller.js.map
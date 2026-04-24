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
exports.TEvaluacionController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const tevaluacion_service_1 = require("./tevaluacion.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let TEvaluacionController = class TEvaluacionController {
    tevaluacionService;
    constructor(tevaluacionService) {
        this.tevaluacionService = tevaluacionService;
    }
    async getHistorial(req) {
        const userId = req.user.userId || req.user.id || req.user.sub;
        return this.tevaluacionService.getHistorialByUser(userId);
    }
    async evaluarCV(req, files, keywordsString) {
        const userId = req.user.userId || req.user.id || req.user.sub;
        if (!files || files.length === 0) {
            throw new common_1.BadRequestException('No se recibieron archivos.');
        }
        let keywords = [];
        try {
            keywords = JSON.parse(keywordsString);
        }
        catch (error) {
            throw new common_1.BadRequestException('Formato de keywords inválido.');
        }
        let content = '';
        for (const file of files) {
            content += `\n\n--- CV POSTULANTE: ${file.originalname} ---\n`;
            if (file.mimetype === 'application/pdf') {
                try {
                    const pdf = require('pdf-parse');
                    const data = await pdf(file.buffer);
                    content += data.text;
                }
                catch (e) {
                    content += file.buffer.toString('utf-8');
                }
            }
            else {
                content += file.buffer.toString('utf-8');
            }
        }
        return this.tevaluacionService.evaluateResumeCHATGPT(userId, content, keywords);
    }
};
exports.TEvaluacionController = TEvaluacionController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('historial'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TEvaluacionController.prototype, "getHistorial", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('evaluar'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Body)('keywords')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array, String]),
    __metadata("design:returntype", Promise)
], TEvaluacionController.prototype, "evaluarCV", null);
exports.TEvaluacionController = TEvaluacionController = __decorate([
    (0, common_1.Controller)('evaluacion'),
    __metadata("design:paramtypes", [tevaluacion_service_1.TEvaluacionService])
], TEvaluacionController);
//# sourceMappingURL=tevaluacion.controller.js.map
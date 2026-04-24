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
exports.UsuariosService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const usuario_schema_1 = require("./schemas/usuario.schema");
let UsuariosService = class UsuariosService {
    usuarioModel;
    constructor(usuarioModel) {
        this.usuarioModel = usuarioModel;
    }
    async findByEmail(email) {
        return this.usuarioModel.findOne({ email }).exec();
    }
    async findByGoogleId(googleId) {
        return this.usuarioModel.findOne({ googleId }).exec();
    }
    async findById(id) {
        return this.usuarioModel.findById(id).exec();
    }
    async updateTokens(userId, tokensToAddOrSubtract, nuevoPlan) {
        const updateData = { $inc: { tokens: tokensToAddOrSubtract } };
        if (nuevoPlan) {
            updateData.$set = { plan: nuevoPlan };
        }
        const updatedUser = await this.usuarioModel.findByIdAndUpdate(userId, updateData, { new: true }).exec();
        if (!updatedUser) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        return updatedUser;
    }
    async deducirTokensParaAnalisis(userId, costo) {
        const user = await this.usuarioModel.findById(userId).exec();
        if (!user) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        if (user.tokens < costo) {
            throw new common_1.HttpException('Tokens insuficientes para realizar el análisis', common_1.HttpStatus.PAYMENT_REQUIRED);
        }
        await this.usuarioModel.findByIdAndUpdate(userId, { $inc: { tokens: -costo } }).exec();
    }
    async reembolsarTokens(userId, costo) {
        await this.usuarioModel.findByIdAndUpdate(userId, { $inc: { tokens: costo } }).exec();
    }
    findAll() {
        return this.usuarioModel.find().exec();
    }
    findOne(id) {
        return this.usuarioModel.findById(id).exec();
    }
    create(data) {
        const cleanedData = Object.fromEntries(Object.entries(data).map(([key, value]) => [key.replace(/:$/, ''), value]));
        return new this.usuarioModel(cleanedData).save();
    }
    update(id, updateUsuarioDto) {
        return this.usuarioModel.findByIdAndUpdate(id, updateUsuarioDto, { new: true }).exec();
    }
    aprobar(id, estado) {
        return this.usuarioModel.findByIdAndUpdate(id, { estado }, { new: true }).exec();
    }
    remove(id) {
        return this.usuarioModel.findByIdAndUpdate(id, { estado: 'Inactivo' }, { new: true }).exec();
    }
};
exports.UsuariosService = UsuariosService;
exports.UsuariosService = UsuariosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(usuario_schema_1.Usuario.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsuariosService);
//# sourceMappingURL=usuarios.service.js.map
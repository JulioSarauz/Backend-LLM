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
exports.TUsuarioService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const tusuario_schema_1 = require("./tusuario.schema");
let TUsuarioService = class TUsuarioService {
    tusuarioModel;
    constructor(tusuarioModel) {
        this.tusuarioModel = tusuarioModel;
    }
    findAll() {
        return this.tusuarioModel.find();
    }
    create(data) {
        const cleanedData = Object.fromEntries(Object.entries(data).map(([key, value]) => [key.replace(/:$/, ''), value]));
        return new this.tusuarioModel(cleanedData).save();
    }
    aprobar(id, estado) {
        return this.tusuarioModel.findByIdAndUpdate(id, { estado }, { new: true });
    }
};
exports.TUsuarioService = TUsuarioService;
exports.TUsuarioService = TUsuarioService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(tusuario_schema_1.TUsuario.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TUsuarioService);
//# sourceMappingURL=tusuario.service.js.map
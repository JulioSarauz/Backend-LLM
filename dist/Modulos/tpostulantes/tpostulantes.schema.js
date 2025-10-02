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
exports.TPostulanteSchema = exports.TPostulante = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let TPostulante = class TPostulante extends mongoose_2.Document {
    correo;
    nombres;
    celular;
    cargo;
    genero;
    estado;
    fecharegistro;
    responsable;
};
exports.TPostulante = TPostulante;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TPostulante.prototype, "correo", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TPostulante.prototype, "nombres", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TPostulante.prototype, "celular", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TPostulante.prototype, "cargo", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TPostulante.prototype, "genero", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 1 }),
    __metadata("design:type", String)
], TPostulante.prototype, "estado", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: () => new Date().toISOString() }),
    __metadata("design:type", String)
], TPostulante.prototype, "fecharegistro", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'ADMIN' }),
    __metadata("design:type", String)
], TPostulante.prototype, "responsable", void 0);
exports.TPostulante = TPostulante = __decorate([
    (0, mongoose_1.Schema)()
], TPostulante);
exports.TPostulanteSchema = mongoose_1.SchemaFactory.createForClass(TPostulante);
//# sourceMappingURL=tpostulantes.schema.js.map
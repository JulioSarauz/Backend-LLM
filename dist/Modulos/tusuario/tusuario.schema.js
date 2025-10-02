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
exports.TUsuarioSchema = exports.TUsuario = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let TUsuario = class TUsuario extends mongoose_2.Document {
    nombre;
    correoinstitucional;
    cargo;
    estado;
    fecharegistro;
    resposnable;
};
exports.TUsuario = TUsuario;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], TUsuario.prototype, "nombre", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TUsuario.prototype, "correoinstitucional", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TUsuario.prototype, "cargo", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TUsuario.prototype, "estado", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TUsuario.prototype, "fecharegistro", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], TUsuario.prototype, "resposnable", void 0);
exports.TUsuario = TUsuario = __decorate([
    (0, mongoose_1.Schema)()
], TUsuario);
exports.TUsuarioSchema = mongoose_1.SchemaFactory.createForClass(TUsuario);
//# sourceMappingURL=tusuario.schema.js.map
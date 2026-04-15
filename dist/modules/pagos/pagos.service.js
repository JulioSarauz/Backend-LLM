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
exports.PagosService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const paypal_service_1 = require("./paypal.service");
const transaccion_schema_1 = require("./schemas/transaccion.schema");
let PagosService = class PagosService {
    paypalService;
    transaccionModel;
    constructor(paypalService, transaccionModel) {
        this.paypalService = paypalService;
        this.transaccionModel = transaccionModel;
    }
    async crearOrden(dto) {
        const paypalOrder = await this.paypalService.createOrder(dto.monto);
        const nuevaTransaccion = new this.transaccionModel({
            usuarioId: dto.usuarioId,
            paypalOrderId: paypalOrder.id,
            monto: dto.monto,
            tokensAdquiridos: dto.tokens,
            estado: 'PENDING',
        });
        return await nuevaTransaccion.save().then(t => ({
            orderId: paypalOrder.id,
            links: paypalOrder.links
        }));
    }
    async capturarOrden(orderId) {
        const transaccion = await this.transaccionModel.findOne({ paypalOrderId: orderId });
        if (!transaccion)
            throw new common_1.NotFoundException('Transacción no encontrada');
        if (transaccion.estado === 'COMPLETED')
            throw new common_1.BadRequestException('Esta orden ya fue procesada');
        const captureResult = await this.paypalService.capturePayment(orderId);
        if (captureResult.status === 'COMPLETED') {
            transaccion.estado = 'COMPLETED';
            await transaccion.save();
            return { success: true, message: 'Pago completado y tokens acreditados' };
        }
        transaccion.estado = 'FAILED';
        await transaccion.save();
        throw new common_1.BadRequestException('El pago no se pudo completar en PayPal');
    }
};
exports.PagosService = PagosService;
exports.PagosService = PagosService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(transaccion_schema_1.Transaccion.name)),
    __metadata("design:paramtypes", [paypal_service_1.PaypalService,
        mongoose_2.Model])
], PagosService);
//# sourceMappingURL=pagos.service.js.map
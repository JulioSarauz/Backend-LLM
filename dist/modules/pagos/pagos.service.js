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
const stripe_1 = require("stripe");
const pago_schema_1 = require("./schemas/pago.schema");
const usuarios_service_1 = require("../usuarios/usuarios.service");
let PagosService = class PagosService {
    pagoModel;
    usuariosService;
    stripe;
    planes = {
        'Basico': { precio: 499, tokens: 20 },
        'Profesional': { precio: 1499, tokens: 100 },
        'Corporativo': { precio: 4999, tokens: 500 },
    };
    constructor(pagoModel, usuariosService) {
        this.pagoModel = pagoModel;
        this.usuariosService = usuariosService;
        this.stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
            apiVersion: '2026-03-25.dahlia',
        });
    }
    async crearSesionCheckout(userId, email, planName) {
        const planElegido = this.planes[planName];
        if (!planElegido) {
            throw new common_1.BadRequestException('Plan inválido');
        }
        const session = await this.stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            customer_email: email,
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `Plan ${planName} - ResumeAnalyzer IA`,
                            description: `Recarga de ${planElegido.tokens} tokens`,
                        },
                        unit_amount: planElegido.precio,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/dashboard?pago=exitoso`,
            cancel_url: `${process.env.FRONTEND_URL}/dashboard?pago=cancelado`,
            metadata: {
                userId: userId,
                planName: planName,
                tokens: planElegido.tokens.toString(),
            },
        });
        await new this.pagoModel({
            sessionId: session.id,
            usuarioId: userId,
            plan: planName,
            monto: planElegido.precio / 100,
            estado: 'Pendiente',
        }).save();
        return { url: session.url };
    }
    async manejarWebhook(req, signature) {
        if (!req.rawBody) {
            throw new common_1.BadRequestException('No se recibió el cuerpo de la petición (rawBody)');
        }
        let event;
        try {
            event = this.stripe.webhooks.constructEvent(req.rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET);
        }
        catch (err) {
            throw new common_1.BadRequestException(`Webhook Error: ${err.message}`);
        }
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            if (!session.metadata) {
                return { received: true };
            }
            const { userId, planName, tokens } = session.metadata;
            await this.pagoModel.findOneAndUpdate({ sessionId: session.id }, { estado: 'Completado' }).exec();
            await this.usuariosService.updateTokens(userId, parseInt(tokens), planName);
        }
        return { received: true };
    }
};
exports.PagosService = PagosService;
exports.PagosService = PagosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(pago_schema_1.Pago.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        usuarios_service_1.UsuariosService])
], PagosService);
//# sourceMappingURL=pagos.service.js.map
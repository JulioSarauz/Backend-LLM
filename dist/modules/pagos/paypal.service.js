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
exports.PaypalService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let PaypalService = class PaypalService {
    configService;
    apiUrl;
    constructor(configService) {
        this.configService = configService;
        const isSandbox = this.configService.get('PAYPAL_SANDBOX') === 'true';
        this.apiUrl = isSandbox
            ? 'https://api-m.sandbox.paypal.com'
            : 'https://api-m.paypal.com';
    }
    async getAccessToken() {
        const clientId = this.configService.get('PAYPAL_CLIENT_ID');
        const secret = this.configService.get('PAYPAL_CLIENT_SECRET');
        const auth = Buffer.from(`${clientId}:${secret}`).toString('base64');
        const response = await fetch(`${this.apiUrl}/v1/oauth2/token`, {
            method: 'POST',
            body: 'grant_type=client_credentials',
            headers: {
                Authorization: `Basic ${auth}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        const data = await response.json();
        if (!response.ok)
            throw new common_1.InternalServerErrorException('Error obteniendo token de PayPal');
        return data.access_token;
    }
    async createOrder(monto) {
        const accessToken = await this.getAccessToken();
        const response = await fetch(`${this.apiUrl}/v2/checkout/orders`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                intent: 'CAPTURE',
                purchase_units: [
                    {
                        amount: {
                            currency_code: 'USD',
                            value: monto.toFixed(2),
                        },
                    },
                ],
            }),
        });
        const data = await response.json();
        if (!response.ok)
            throw new common_1.InternalServerErrorException('Error creando orden en PayPal');
        return data;
    }
    async capturePayment(orderId) {
        const accessToken = await this.getAccessToken();
        const response = await fetch(`${this.apiUrl}/v2/checkout/orders/${orderId}/capture`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (!response.ok)
            throw new common_1.InternalServerErrorException('Error capturando pago en PayPal');
        return data;
    }
};
exports.PaypalService = PaypalService;
exports.PaypalService = PaypalService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], PaypalService);
//# sourceMappingURL=paypal.service.js.map
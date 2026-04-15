import { ConfigService } from '@nestjs/config';
export declare class PaypalService {
    private configService;
    private apiUrl;
    constructor(configService: ConfigService);
    private getAccessToken;
    createOrder(monto: number): Promise<any>;
    capturePayment(orderId: string): Promise<any>;
}

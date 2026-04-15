import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaypalService {
  private apiUrl: string;

  constructor(private configService: ConfigService) {
    const isSandbox = this.configService.get<string>('PAYPAL_SANDBOX') === 'true';
    this.apiUrl = isSandbox 
      ? 'https://api-m.sandbox.paypal.com' 
      : 'https://api-m.paypal.com';
  }

  private async getAccessToken(): Promise<string> {
    const clientId = this.configService.get<string>('PAYPAL_CLIENT_ID');
    const secret = this.configService.get<string>('PAYPAL_CLIENT_SECRET');
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
    if (!response.ok) throw new InternalServerErrorException('Error obteniendo token de PayPal');
    return data.access_token;
  }

  async createOrder(monto: number): Promise<any> {
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
    if (!response.ok) throw new InternalServerErrorException('Error creando orden en PayPal');
    return data; 
  }

  async capturePayment(orderId: string): Promise<any> {
    const accessToken = await this.getAccessToken();

    const response = await fetch(`${this.apiUrl}/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    if (!response.ok) throw new InternalServerErrorException('Error capturando pago en PayPal');
    return data;
  }
}
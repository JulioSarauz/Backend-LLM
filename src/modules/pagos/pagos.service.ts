import { Injectable, BadRequestException, RawBodyRequest } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Stripe from 'stripe';
import { Request } from 'express';
import { Pago } from './schemas/pago.schema';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable()
export class PagosService {
  private stripe: Stripe;

  private readonly planes = {
    'Basico': { precio: 499, tokens: 20 },
    'Profesional': { precio: 1499, tokens: 100 },
    'Corporativo': { precio: 4999, tokens: 500 },
  };

  constructor(
    @InjectModel(Pago.name) private pagoModel: Model<Pago>,
    private usuariosService: UsuariosService
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: '2026-03-25.dahlia',
    });
  }

  async crearSesionCheckout(userId: string, email: string, planName: string) {
    const planElegido = this.planes[planName];
    if (!planElegido) {
      throw new BadRequestException('Plan inválido');
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

  async manejarWebhook(req: RawBodyRequest<Request>, signature: string) {
    if (!req.rawBody) {
      throw new BadRequestException('No se recibió el cuerpo de la petición (rawBody)');
    }

    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        req.rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET as string
      );
    } catch (err: any) {
      throw new BadRequestException(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      
      if (!session.metadata) {
        return { received: true };
      }

      const { userId, planName, tokens } = session.metadata;

      await this.pagoModel.findOneAndUpdate(
        { sessionId: session.id },
        { estado: 'Completado' }
      ).exec();

      await this.usuariosService.updateTokens(userId, parseInt(tokens), planName);
    }

    return { received: true };
  }
}
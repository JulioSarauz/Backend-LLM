import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaypalService } from './paypal.service';
import { Transaccion, TransaccionDocument } from './schemas/transaccion.schema';
import { CrearOrdenDto } from './dto/crear-orden.dto';

@Injectable()
export class PagosService {
  constructor(
    private readonly paypalService: PaypalService,
    @InjectModel(Transaccion.name) private transaccionModel: Model<TransaccionDocument>,
  ) {}

async crearOrden(dto: CrearOrdenDto) { // dto ahora ya trae el usuarioId correcto desde el controller
  const paypalOrder = await this.paypalService.createOrder(dto.monto);

  const nuevaTransaccion = new this.transaccionModel({
    usuarioId: dto.usuarioId, // Este ya es el ID real del usuario
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

  async capturarOrden(orderId: string) {
    const transaccion = await this.transaccionModel.findOne({ paypalOrderId: orderId });
    if (!transaccion) throw new NotFoundException('Transacción no encontrada');
    if (transaccion.estado === 'COMPLETED') throw new BadRequestException('Esta orden ya fue procesada');

    const captureResult = await this.paypalService.capturePayment(orderId);

    if (captureResult.status === 'COMPLETED') {
      transaccion.estado = 'COMPLETED';
      await transaccion.save();

      // TODO: Una vez que confirmes la ruta de tu módulo de usuarios, 
      // inyecta el modelo Usuario en el constructor y actualiza los tokens aquí.
      // Ejemplo:
      // await this.usuarioModel.findByIdAndUpdate(transaccion.usuarioId, { $inc: { tokens: transaccion.tokensAdquiridos } });

      return { success: true, message: 'Pago completado y tokens acreditados' };
    }

    transaccion.estado = 'FAILED';
    await transaccion.save();
    throw new BadRequestException('El pago no se pudo completar en PayPal');
  }
}
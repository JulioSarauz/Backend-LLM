import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'pagos' })
export class Pago extends Document {
  @Prop({ required: true })
  sessionId: string;

  @Prop({ required: true })
  usuarioId: string;

  @Prop({ required: true })
  plan: string;

  @Prop({ required: true })
  monto: number;

  @Prop({ default: 'Pendiente' })
  estado: string;
}

export const PagoSchema = SchemaFactory.createForClass(Pago);
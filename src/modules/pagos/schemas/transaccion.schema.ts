import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TransaccionDocument = Transaccion & Document;

@Schema({ timestamps: true })
export class Transaccion {
  @Prop({ type: Types.ObjectId, ref: 'Usuario', required: true })
  usuarioId: string;

  @Prop({ required: true })
  paypalOrderId: string;

  @Prop({ required: true })
  monto: number;

  @Prop({ required: true })
  tokensAdquiridos: number;

  @Prop({ required: true, enum: ['PENDING', 'COMPLETED', 'FAILED'], default: 'PENDING' })
  estado: string;
}

export const TransaccionSchema = SchemaFactory.createForClass(Transaccion);
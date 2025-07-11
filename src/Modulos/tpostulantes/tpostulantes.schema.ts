// mascotas/schemas/mascota.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class TPostulante extends Document {
  @Prop()
  correo: string;

  @Prop()
  nombres: string;

  @Prop()
  celular: string;

  @Prop()
  cargo: string;

  @Prop()
  genero: string;

  @Prop({default:1})
  estado: string;

  // Fecha actual en UTC al momento de crear el documento
  @Prop({ default: () => new Date().toISOString() })
  fecharegistro: string;

  // Valor por defecto "ADMIN"
  @Prop({ default: 'ADMIN' })
  responsable: string;
}

export const TPostulanteSchema = SchemaFactory.createForClass(TPostulante);

// adopciones/schemas/adopcion.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class TUsuario extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop()
  correoinstitucional: string;

  @Prop()
  cargo: string; 
  
  @Prop()
  estado: string; 
  
  @Prop()
  fecharegistro: string;
  
  @Prop()
  resposnable: string;  
}

export const TUsuarioSchema = SchemaFactory.createForClass(TUsuario);
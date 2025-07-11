// adopciones/schemas/adopcion.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class TEvaluacion extends Document {

  @Prop({ required: true })
  resultado: string;

  @Prop()
  estado: string;

  @Prop()
  fecharegistro: string; 
  
  @Prop()
  responsable: string;
  
  @Prop()
  fktpostulante: string;
  
}

export const TEvaluacionSchema = SchemaFactory.createForClass(TEvaluacion);
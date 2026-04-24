import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TEvaluacionDocument = TEvaluacion & Document;

@Schema({ timestamps: true, collection: 'evaluaciones' })
export class TEvaluacion {
  @Prop()
  resultado: string;

  @Prop({ default: 'Completado' })
  estado: string;

  @Prop()
  fecharegistro: string; 
  
  @Prop()
  responsable: string;
  
  @Prop()
  fktpostulante: string;

  @Prop({ type: Types.ObjectId, ref: 'Usuario' })
  usuarioId: Types.ObjectId | string;

  @Prop({ type: [String], default: [] })
  keywords: string[];

  @Prop({ type: Array, default: [] })
  resultados: any[];
}

export const TEvaluacionSchema = SchemaFactory.createForClass(TEvaluacion);
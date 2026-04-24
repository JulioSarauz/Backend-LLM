import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Add this line to export the combined type
export type UsuarioDocument = Usuario & Document;

@Schema({ timestamps: true, collection: 'usuarios' })
export class Usuario { // Removed "extends Document" here as it's better handled by the type above in NestJS 10+
  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  password?: string;

  @Prop()
  nombres: string;

  @Prop({ unique: true, sparse: true })
  googleId?: string;

  @Prop({ default: 10 })
  tokens: number;

  @Prop({ default: 'Gratis' })
  plan: string;
} 

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
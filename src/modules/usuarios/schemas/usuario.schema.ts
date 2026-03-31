import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'usuarios' })
export class Usuario extends Document {
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
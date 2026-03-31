import { Injectable, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario } from './schemas/usuario.schema';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario.name) private usuarioModel: Model<Usuario>
  ) {}

  async findByEmail(email: string): Promise<Usuario | null> {
    return this.usuarioModel.findOne({ email }).exec();
  }

  async findByGoogleId(googleId: string): Promise<Usuario | null> {
    return this.usuarioModel.findOne({ googleId }).exec();
  }

  async updateTokens(userId: string, tokensToAddOrSubtract: number, nuevoPlan?: string): Promise<Usuario> {
    const updateData: any = { $inc: { tokens: tokensToAddOrSubtract } };
    if (nuevoPlan) {
      updateData.$set = { plan: nuevoPlan };
    }

    const updatedUser = await this.usuarioModel.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    ).exec();

    if (!updatedUser) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return updatedUser;
  }

  async deducirTokensParaAnalisis(userId: string, costo: number): Promise<void> {
    const user = await this.usuarioModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    if (user.tokens < costo) {
      throw new HttpException('Tokens insuficientes para realizar el análisis', HttpStatus.PAYMENT_REQUIRED);
    }
    
    await this.usuarioModel.findByIdAndUpdate(userId, { $inc: { tokens: -costo } }).exec();
  }

  async reembolsarTokens(userId: string, costo: number): Promise<void> {
    await this.usuarioModel.findByIdAndUpdate(userId, { $inc: { tokens: costo } }).exec();
  }

  findAll() {
    return this.usuarioModel.find().exec();
  }

  findOne(id: string) {
    return this.usuarioModel.findById(id).exec();
  }

  create(data: Partial<Usuario>) {
    const cleanedData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key.replace(/:$/, ''), value])
    );
    return new this.usuarioModel(cleanedData).save();
  }

  update(id: string, updateUsuarioDto: any) {
    return this.usuarioModel.findByIdAndUpdate(id, updateUsuarioDto, { new: true }).exec();
  }

  aprobar(id: string, estado: string) {
    return this.usuarioModel.findByIdAndUpdate(id, { estado }, { new: true }).exec();
  }

  remove(id: string) {
    return this.usuarioModel.findByIdAndUpdate(id, { estado: 'Inactivo' }, { new: true }).exec();
  }
}
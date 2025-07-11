// adopciones/adopciones.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TUsuario } from './tusuario.schema';
@Injectable()
export class TUsuarioService {
  constructor(@InjectModel(TUsuario.name) private tusuarioModel: Model<TUsuario>) {}

  findAll() {
    return this.tusuarioModel.find();
  }

  create(data: Partial<TUsuario>) {
      const cleanedData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key.replace(/:$/, ''), value])
    );
    return new this.tusuarioModel(cleanedData).save();
  }

  aprobar(id: string, estado: string) {
    return this.tusuarioModel.findByIdAndUpdate(id, { estado }, { new: true });
  }
}

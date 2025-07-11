// mascotas/mascotas.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TPostulante } from './tpostulantes.schema';

@Injectable()
export class TPostulanteService {
  constructor(@InjectModel(TPostulante.name) private tpostulanteModel: Model<TPostulante>) {}

  findAll() {
    return this.tpostulanteModel.find();
  }

  findById(id: string) {
    return this.tpostulanteModel.findById(id);
  }

 create(data: Partial<TPostulante>) {
  const cleanedData = Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key.replace(/:$/, ''), value])
  );
  return new this.tpostulanteModel(cleanedData).save();
}
  update(id: string, data: Partial<TPostulante>) {
    return this.tpostulanteModel.findByIdAndUpdate(id, data, { new: true });
  }

  delete(id: string) {
    return this.tpostulanteModel.findByIdAndDelete(id);
  }
}
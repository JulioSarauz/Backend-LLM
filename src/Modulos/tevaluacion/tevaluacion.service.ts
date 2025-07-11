// adopciones/adopciones.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TEvaluacion } from './tevaluacion.schema';
@Injectable()
export class TEvaluacionService {
  constructor(@InjectModel(TEvaluacion.name) private tevaluacionModel: Model<TEvaluacion>) {}

  findAll() {
    return this.tevaluacionModel.find();
  }

  create(data: Partial<TEvaluacion>) {
    const cleanedData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key.replace(/:$/, ''), value])
    );
    return new this.tevaluacionModel(cleanedData).save();
  }

  aprobar(id: string, estado: string) {
    return this.tevaluacionModel.findByIdAndUpdate(id, { estado }, { new: true });
  }
}

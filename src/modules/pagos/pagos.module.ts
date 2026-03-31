import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PagosController } from './pagos.controller';
import { PagosService } from './pagos.service';
import { Pago, PagoSchema } from './schemas/pago.schema';
import { UsuariosModule } from '../usuarios/usuarios.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pago.name, schema: PagoSchema }]),
    UsuariosModule
  ],
  controllers: [PagosController],
  providers: [PagosService]
})
export class PagosModule {}
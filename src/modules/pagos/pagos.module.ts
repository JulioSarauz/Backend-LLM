import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PagosController } from './pagos.controller';
import { PagosService } from './pagos.service';
import { PaypalService } from './paypal.service';
import { Transaccion, TransaccionSchema } from './schemas/transaccion.schema';
import { AuthModule } from '../auth/auth.module';
import { UsuariosModule } from '../usuarios/usuarios.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Transaccion.name, schema: TransaccionSchema }]),
    AuthModule,
    UsuariosModule
  ],
  controllers: [PagosController],
  providers: [PagosService, PaypalService],
  exports: [PagosService],
})
export class PagosModule {}
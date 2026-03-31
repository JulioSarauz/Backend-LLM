import { Module } from '@nestjs/common';
import { SuscripcionesController } from './suscripciones.controller';
import { SuscripcionesService } from './suscripciones.service';
import { UsuariosModule } from '../usuarios/usuarios.module';

@Module({
  imports: [UsuariosModule],
  controllers: [SuscripcionesController],
  providers: [SuscripcionesService]
})
export class SuscripcionesModule {}
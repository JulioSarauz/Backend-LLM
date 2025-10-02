import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdopcionesController } from './Modulos/tevaluacion/tevaluacion.controller';
import { MascotasController } from './Modulos/tpostulantes/tpostulantes.controller';
import { TUsuario, TUsuarioSchema } from './Modulos/tusuario/tusuario.schema';
import { TEvaluacion, TEvaluacionSchema } from './Modulos/tevaluacion/tevaluacion.schema';
import { TPostulante, TPostulanteSchema } from './Modulos/tpostulantes/tpostulantes.schema';
import { SERVICIOS } from './Constantes/SERVICIOS';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
        // Opcional: mejoras para compatibilidad
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    MongooseModule.forFeature([
      { name: TUsuario.name, schema: TUsuarioSchema },
      { name: TEvaluacion.name, schema: TEvaluacionSchema },
      { name: TPostulante.name, schema: TPostulanteSchema },
    ]),
  ],
  controllers: [AppController, MascotasController, AdopcionesController],
  providers: [AppService, ...SERVICIOS],
})
export class AppModule {}

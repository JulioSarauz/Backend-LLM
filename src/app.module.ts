// app.module.ts
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
    ConfigModule.forRoot({
      isGlobal: true, // ✅ hace disponible la configuración en toda la app
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
      MongooseModule.forFeature([{ name: TUsuario.name, schema: TUsuarioSchema }]),
      MongooseModule.forFeature([{ name: TEvaluacion.name, schema: TEvaluacionSchema }]),
      MongooseModule.forFeature([{ name: TPostulante.name, schema: TPostulanteSchema }]),
  ],
  controllers: [AppController, MascotasController, AdopcionesController],
  providers: [AppService, 
    ...SERVICIOS
  ],
})
export class AppModule {}

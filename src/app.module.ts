import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TEvaluacion, TEvaluacionSchema } from './modules/evaluacion/tevaluacion.schema';
import { TPostulante, TPostulanteSchema } from './modules/postulantes/tpostulantes.schema';
import { SERVICIOS } from './common/constants/SERVICIOS';
import { PostulantesController } from './modules/postulantes/tpostulantes.controller';
import { TEvaluacionController } from './modules/evaluacion/tevaluacion.controller';
import { AuthModule } from './modules/auth/auth.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { SuscripcionesModule } from './modules/suscripciones/suscripciones.module';
import { PagosModule } from './modules/pagos/pagos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: TEvaluacion.name, schema: TEvaluacionSchema }]),
    MongooseModule.forFeature([{ name: TPostulante.name, schema: TPostulanteSchema }]),
    AuthModule,
    UsuariosModule,
    SuscripcionesModule,
    PagosModule
  ],
  controllers: [AppController, PostulantesController, TEvaluacionController],
  providers: [AppService, ...SERVICIOS],
})
export class AppModule {}

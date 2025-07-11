import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const puerto = process.env.PORT ?? 3000;
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  Logger.warn('Aplicativo corriendo en el puerto: '+ puerto);
  await app.listen(puerto);
}
bootstrap();

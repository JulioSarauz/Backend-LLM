import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  Logger.warn(`Aplicativo corriendo en el puerto: ${port}`);

  // 👇 Importante para Render
  await app.listen(port, '0.0.0.0');
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Backend-LLM')
    .setDescription('Documentación de los endpoints de la aplicación que sirven para la seleccion con IA de los postulantes de la Cooperativa de Ahorro y Crédito 29 de octubre LTDA.')
    .setVersion('1.0')
    .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
        'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  Logger.warn(`Aplicativo corriendo en el puerto: ${port}`);
  Logger.log(`Documentación de Swagger disponible en: http://localhost:${port}/api-docs`);
  await app.listen(port, '0.0.0.0');
}
bootstrap();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  app.setGlobalPrefix('api');

 app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
);

  app.enableCors({
    origin: ['http://10.27.63.174:3001', 'http://localhost:3001'],
    credentials: true,
  });

  await app.listen(3005, '0.0.0.0');
  logger.log(`Servidor corriendo en http://localhost:3005`);
}
bootstrap();
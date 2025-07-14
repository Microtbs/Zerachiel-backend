import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(config.get<number>('PORT') || 3000);
}

bootstrap();


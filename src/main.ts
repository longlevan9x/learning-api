import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import process from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: '*' });

  await app.listen(3000);
}

bootstrap();

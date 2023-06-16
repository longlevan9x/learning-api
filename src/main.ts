import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: function (origin, callback) {
      callback(null, true);
      // if (!origin || whitelist.indexOf(origin) !== -1) {
      // } else {
      //   callback(new Error('Not allowed by CORS'))
      // }
    },
  });

  await app.listen(3000);
}

bootstrap();

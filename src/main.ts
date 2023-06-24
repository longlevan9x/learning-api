import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    allowedHeaders: '*',
    origin: true,
    methods: ['GET,HEAD,PUT,PATCH,POST,DELETE'],
    optionsSuccessStatus: 204,
    preflightContinue: false,
    // credentials: true,
  });
  // const options = {
  //   origin: '*',
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   preflightContinue: false,
  //   optionsSuccessStatus: 204,
  //   // credentials: true,
  // };
  //app.use(cors(options))
  // app.enableCors(options);
  // app.enableCors({
  //   origin: function (origin, callback) {
  //     callback(null, true);
  //     // if (!origin || whitelist.indexOf(origin) !== -1) {
  //     // } else {
  //     //   callback(new Error('Not allowed by CORS'))
  //     // }
  //   },
  // });

  await app.listen(3000);
}

bootstrap();

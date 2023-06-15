import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookModule } from './modules/book/book.module';
import { LessonModule } from './modules/lesson/lesson.module';
import { CategoryModule } from './modules/category/category.module';
import { RouterModule } from '@nestjs/core';
import { appRoutes } from './app.routes';
import { CloneModule } from './modules/clone/clone.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: false,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI, { dbName: 'learning' }),
    RouterModule.register(appRoutes),
    BookModule,
    LessonModule,
    CategoryModule,
    CloneModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

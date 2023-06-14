import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  LessonModel,
  LessonSchema,
  LessonTableName,
} from '../../app/schemas/lesson.schema';
import { LessonRepository } from '../../app/repositories/lesson.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: LessonModel.name,
        schema: LessonSchema,
        collection: LessonTableName,
      },
    ]),
  ],
  controllers: [LessonController],
  providers: [LessonService, LessonRepository],
})
export class LessonModule {}

import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LessonSchema, LessonTableName } from '../../app/schemas/lesson.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LessonTableName, schema: LessonSchema },
    ]),
  ],
  controllers: [LessonController],
  providers: [LessonService],
})
export class LessonModule {}

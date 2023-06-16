import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { CategorySchemaModule } from 'src/app/schemas/category.schema';
import { ScrapingService } from 'src/app/services/scraping.service';
import { CategoryRepository } from 'src/app/repositories/category.repository';
import { LessonRepository } from 'src/app/repositories/lesson.repository';
import { LessonSchemaModule } from 'src/app/schemas/lesson.schema';

@Module({
  imports: [LessonSchemaModule, CategorySchemaModule],
  controllers: [LessonController],
  providers: [
    LessonService,
    LessonRepository,
    CategoryRepository,
    ScrapingService,
  ],
})
export class LessonModule {}

import { Module } from '@nestjs/common';
import { VocabularyService } from './vocabulary.service';
import { VocabularyController } from './vocabulary.controller';
import { VocabularySchemaModule } from 'src/app/schemas/vocabulary.schema';
import { VocabularyRepository } from 'src/app/repositories/vocabulary.repository';
import { ScrapingServiceInterface } from '../../app/services/scraping.service';
import { LessonRepository } from '../../app/repositories/lesson.repository';
import { LessonSchemaModule } from '../../app/schemas/lesson.schema';
import { CategorySchemaModule } from '../../app/schemas/category.schema';
import { CategoryRepository } from '../../app/repositories/category.repository';

@Module({
  controllers: [VocabularyController],
  providers: [
    VocabularyService,
    ScrapingServiceInterface,
    VocabularyRepository,
    LessonRepository,
    CategoryRepository,
  ],
  imports: [VocabularySchemaModule, LessonSchemaModule, CategorySchemaModule],
})
export class VocabularyModule {}

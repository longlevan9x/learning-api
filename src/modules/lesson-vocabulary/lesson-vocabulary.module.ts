import { Module } from '@nestjs/common';
import { LessonVocabularyService } from './lesson-vocabulary.service';
import { LessonVocabularyController } from './lesson-vocabulary.controller';
import { ScrapingService } from 'src/app/services/scraping.service';
import { LessonVocabularySchemaModule } from 'src/app/schemas/lessonVocabulary';
import { LessonVocabularyRepository } from 'src/app/repositories/lessonVocabulary.repository';

@Module({
  controllers: [LessonVocabularyController],
  providers: [
    LessonVocabularyService,
    ScrapingService,
    LessonVocabularyRepository,
  ],
  imports: [LessonVocabularySchemaModule],
})
export class LessonVocabularyModule {}

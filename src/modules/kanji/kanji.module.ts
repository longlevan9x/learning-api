import { Module } from '@nestjs/common';
import { KanjiService } from './kanji.service';
import { KanjiController } from './kanji.controller';
import { ScrapingServiceInterface } from '../../app/services/scraping.service';
import { VocabularyRepository } from '../../app/repositories/vocabulary.repository';
import { LessonRepository } from '../../app/repositories/lesson.repository';
import { VocabularySchemaModule } from '../../app/schemas/vocabulary.schema';
import { LessonSchemaModule } from '../../app/schemas/lesson.schema';

@Module({
  controllers: [KanjiController],
  providers: [
    KanjiService,
    ScrapingServiceInterface,
    VocabularyRepository,
    LessonRepository,
  ],
  imports: [VocabularySchemaModule, LessonSchemaModule],
})
export class KanjiModule {}

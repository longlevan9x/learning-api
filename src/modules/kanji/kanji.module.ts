import { Module } from '@nestjs/common';
import { KanjiService } from './kanji.service';
import { KanjiController } from './kanji.controller';
import { ScrapingServiceInterface } from '../../app/services/scraping.service';
import { LessonRepository } from '../../app/repositories/lesson.repository';
import { LessonSchemaModule } from '../../app/schemas/lesson.schema';
import { KanjiSchemaModule } from '../../app/schemas/kanji.schema';
import { KanjiRepository } from '../../app/repositories/kanji.repository';

@Module({
  controllers: [KanjiController],
  providers: [
    KanjiService,
    ScrapingServiceInterface,
    KanjiRepository,
    LessonRepository,
  ],
  imports: [KanjiSchemaModule, LessonSchemaModule],
})
export class KanjiModule {}

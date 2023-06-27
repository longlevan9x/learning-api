import { Module } from '@nestjs/common';
import { GrammarService } from './grammar.service';
import { GrammarController } from './grammar.controller';
import { GrammarRepository } from 'src/app/repositories/grammar.repository';
import { GrammarSchemaModule } from '../../app/schemas/grammar.schema';
import { ScrapingServiceInterface } from '../../app/services/scraping.service';
import { LessonSchemaModule } from '../../app/schemas/lesson.schema';
import { LessonRepository } from '../../app/repositories/lesson.repository';

@Module({
  controllers: [GrammarController],
  providers: [
    GrammarService,
    ScrapingServiceInterface,
    GrammarRepository,
    LessonRepository,
  ],
  imports: [GrammarSchemaModule, LessonSchemaModule],
})
export class GrammarModule {}

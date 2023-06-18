import { Module } from '@nestjs/common';
import { VocabularyService } from './vocabulary.service';
import { VocabularyController } from './vocabulary.controller';
import { ScrapingService } from 'src/app/services/scraping.service';
import { VocabularySchemaModule } from 'src/app/schemas/vocabulary.schema';
import { VocabularyRepository } from 'src/app/repositories/vocabulary.repository';

@Module({
  controllers: [VocabularyController],
  providers: [
    VocabularyService,
    ScrapingService,
    VocabularyRepository,
  ],
  imports: [VocabularySchemaModule],
})
export class VocabularyModule {}

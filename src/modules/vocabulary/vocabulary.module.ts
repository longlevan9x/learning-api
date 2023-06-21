import { Module } from '@nestjs/common';
import { VocabularyService } from './vocabulary.service';
import { VocabularyController } from './vocabulary.controller';
import { VocabularySchemaModule } from 'src/app/schemas/vocabulary.schema';
import { VocabularyRepository } from 'src/app/repositories/vocabulary.repository';
import { ScrapingServiceInterface } from '../../app/services/scraping.service';

@Module({
  controllers: [VocabularyController],
  providers: [
    VocabularyService,
    ScrapingServiceInterface,
    VocabularyRepository,
  ],
  imports: [VocabularySchemaModule],
})
export class VocabularyModule {}

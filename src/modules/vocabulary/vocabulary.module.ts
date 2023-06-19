import { Module } from '@nestjs/common';
import { VocabularyService } from './vocabulary.service';
import { VocabularyController } from './vocabulary.controller';
import { PuppeteerService } from 'src/app/services/puppeteer.service';
import { VocabularySchemaModule } from 'src/app/schemas/vocabulary.schema';
import { VocabularyRepository } from 'src/app/repositories/vocabulary.repository';

@Module({
  controllers: [VocabularyController],
  providers: [
    VocabularyService,
    PuppeteerService,
    VocabularyRepository,
  ],
  imports: [VocabularySchemaModule],
})
export class VocabularyModule {}

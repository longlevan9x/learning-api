import { Module } from '@nestjs/common';
import { GrammarService } from './grammar.service';
import { GrammarController } from './grammar.controller';
import { GrammarRepository } from 'src/app/repositories/grammar.repository';
import { GrammarSchemaModule } from '../../app/schemas/grammar.schema';
import { ScrapingServiceInterface } from '../../app/services/scraping.service';

@Module({
  controllers: [GrammarController],
  providers: [GrammarService, ScrapingServiceInterface, GrammarRepository],
  imports: [GrammarSchemaModule],
})
export class GrammarModule {}

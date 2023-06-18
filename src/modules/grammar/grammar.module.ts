import { Module } from '@nestjs/common';
import { GrammarService } from './grammar.service';
import { GrammarController } from './grammar.controller';
import { ScrapingService } from 'src/app/services/scraping.service';
import { GrammarRepository } from 'src/app/repositories/grammar.repository';
import { GrammarSchemaModule } from '../../app/schemas/grammar.schema';

@Module({
  controllers: [GrammarController],
  providers: [GrammarService, ScrapingService, GrammarRepository],
  imports: [GrammarSchemaModule],
})
export class GrammarModule {}

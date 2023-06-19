import { Module } from '@nestjs/common';
import { GrammarService } from './grammar.service';
import { GrammarController } from './grammar.controller';
import { PuppeteerService } from 'src/app/services/puppeteer.service';
import { GrammarRepository } from 'src/app/repositories/grammar.repository';
import { GrammarSchemaModule } from '../../app/schemas/grammar.schema';

@Module({
  controllers: [GrammarController],
  providers: [GrammarService, PuppeteerService, GrammarRepository],
  imports: [GrammarSchemaModule],
})
export class GrammarModule {}

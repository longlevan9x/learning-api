import { Injectable } from '@nestjs/common';
import { CreateGrammarDto } from './dto/create-grammar.dto';
import { UpdateVocabularyDto } from '../vocabulary/dto/update-vocabulary.dto';
import { ScrapingService } from '../../app/services/scraping.service';
import { GrammarRepository } from '../../app/repositories/grammar.repository';

@Injectable()
export class GrammarService {
  constructor(
    private scrapingService: ScrapingService,
    private grammarRepository: GrammarRepository,
  ) {}

  create(createGrammarDto: CreateGrammarDto) {
    return 'This action adds a new grammar';
  }

  findAll(query?: { lessonId: string }) {
    const _query: any = {};
    if (query.lessonId) {
      _query.lessonId = query.lessonId;
    }

    return this.grammarRepository.findAll(_query);
  }

  findOne(id: string) {
    return `This action returns a #${id} vocabulary`;
  }

  update(id: string, updateVocabularyDto: UpdateVocabularyDto) {
    return `This action updates a #${id} vocabulary`;
  }

  remove(id: string) {
    return `This action removes a #${id} vocabulary`;
  }

  async scraping(lessonId: string, scrapingUrl: string) {
    let listScraping: any[] = await this.scrapingService.scrapingGrammar(
      scrapingUrl,
    );

    listScraping = listScraping.map((v) => {
      v.lessonId = lessonId.toString();
      return v;
    });

    await this.grammarRepository.bulkDelete({ lessonId });
    await this.grammarRepository.bulkCreate(listScraping);

    return { message: 'done' };
  }
}

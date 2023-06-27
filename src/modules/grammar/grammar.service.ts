import { Inject, Injectable } from '@nestjs/common';
import { CreateGrammarDto } from './dto/create-grammar.dto';
import { UpdateVocabularyDto } from '../vocabulary/dto/update-vocabulary.dto';
import { GrammarRepository } from '../../app/repositories/grammar.repository';
import { IScrapingService } from '../../app/services/scraping.service';
import { LessonRepository } from '../../app/repositories/lesson.repository';

@Injectable()
export class GrammarService {
  constructor(
    @Inject(IScrapingService)
    private readonly scrapingService: IScrapingService,
    private grammarRepository: GrammarRepository,
    private lessonRepository: LessonRepository,
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

  async scraping(lessonId: string) {
    const lesson = await this.lessonRepository.findOneById(lessonId);

    if (!lesson) {
      return { message: 'fail lesson' };
    }

    let listScraping: any[] = await this.scrapingService.scrapingGrammar(
      lesson.cloneUrl,
    );

    listScraping = listScraping.map((v) => {
      v.lessonId = lessonId.toString();
      return v;
    });

    await this.grammarRepository.bulkDelete({ lessonId: lessonId.toString() });
    await this.grammarRepository.bulkCreate(listScraping);

    return { message: 'done' };
  }
}

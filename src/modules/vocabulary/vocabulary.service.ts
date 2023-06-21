import { Inject, Injectable } from '@nestjs/common';
import { CreateVocabularyDto } from './dto/create-vocabulary.dto';
import { UpdateVocabularyDto } from './dto/update-vocabulary.dto';
import { VocabularyRepository } from '../../app/repositories/vocabulary.repository';
import { IScrapingService } from '../../app/services/scraping.service';

@Injectable()
export class VocabularyService {
  constructor(
    @Inject(IScrapingService)
    private readonly scrapingService: IScrapingService,
    private vocabularyRepository: VocabularyRepository,
  ) {}

  create(createVocabularyDto: CreateVocabularyDto) {
    return 'This action adds a new vocabulary';
  }

  findAll(query?: { lessonId: string }) {
    const _query: any = {};
    if (query.lessonId) {
      _query.lessonId = query.lessonId;
    }

    return this.vocabularyRepository.findAll(_query);
  }

  findOne(id: number) {
    return `This action returns a #${id} vocabulary`;
  }

  update(id: number, updateVocabularyDto: UpdateVocabularyDto) {
    return `This action updates a #${id} vocabulary`;
  }

  remove(id: number) {
    return `This action removes a #${id} vocabulary`;
  }

  async scraping(lessonId: string, scrapingUrl: string) {
    let vocabularies: any[] = await this.scrapingService.scrapingVocabulary(
      scrapingUrl,
    );

    vocabularies = vocabularies.map((v) => {
      v.lessonId = lessonId.toString();
      return v;
    });

    await this.vocabularyRepository.bulkDelete({ lessonId });
    await this.vocabularyRepository.bulkCreate(vocabularies);

    return { message: 'done' };
  }
}

import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { CreateVocabularyDto } from './dto/create-vocabulary.dto';
import { UpdateVocabularyDto } from './dto/update-vocabulary.dto';
import { VocabularyRepository } from '../../app/repositories/vocabulary.repository';
import { IScrapingService } from '../../app/services/scraping.service';
import { LessonRepository } from '../../app/repositories/lesson.repository';

@Injectable()
export class VocabularyService {
  private logger: LoggerService;
  constructor(
    @Inject(IScrapingService)
    private readonly scrapingService: IScrapingService,
    private vocabularyRepository: VocabularyRepository,
    private lessonRepository: LessonRepository,
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

  async scraping(lessonId: string) {
    const lesson = await this.lessonRepository.findOneById(lessonId);

    if (!lesson) {
      return { message: 'fail lesson' };
    }

    let vocabularies: any[] = await this.scrapingService.scrapingVocabulary(
      lesson.cloneUrl,
    );

    vocabularies = vocabularies.map((v) => {
      v.lessonId = lessonId.toString();
      return v;
    });

    await this.vocabularyRepository.bulkDelete({
      lessonId: lessonId.toString(),
    });
    await this.vocabularyRepository.bulkCreate(vocabularies);

    return { message: 'done' };
  }
}

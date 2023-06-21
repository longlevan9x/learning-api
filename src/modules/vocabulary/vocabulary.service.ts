import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { CreateVocabularyDto } from './dto/create-vocabulary.dto';
import { UpdateVocabularyDto } from './dto/update-vocabulary.dto';
import { VocabularyRepository } from '../../app/repositories/vocabulary.repository';
import { IScrapingService } from '../../app/services/scraping.service';
import { LessonRepository } from '../../app/repositories/lesson.repository';
import { CategoryRepository } from '../../app/repositories/category.repository';

@Injectable()
export class VocabularyService {
  private logger: LoggerService;
  constructor(
    @Inject(IScrapingService)
    private readonly scrapingService: IScrapingService,
    private vocabularyRepository: VocabularyRepository,
    private lessonRepository: LessonRepository,
    private categoryRepository: CategoryRepository,
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

  async scraping(lessonId: string, categoryId: string, scrapingUrl: string) {
    const lesson = await this.lessonRepository.findOneById(lessonId);

    if (!lesson) {
      return { message: 'fail lesson' };
    }

    if (lesson.categoryId !== categoryId) {
      return { message: 'fail category' };
    }

    const category = await this.categoryRepository.findOneById(categoryId);
    let vocabularies: any[] = await this.scrapingService.scrapingVocabulary(
      scrapingUrl,
      {
        categoryName: category.name,
        book: 'minna-no-nihongo',
        lesson: 'bai-1',
        section: 'tu-vung',
      },
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

import { Inject, Injectable } from '@nestjs/common';
import { CreateKanjiDto } from './dto/create-kanji.dto';
import { UpdateKanjiDto } from './dto/update-kanji.dto';
import { IScrapingService } from '../../app/services/scraping.service';
import { VocabularyRepository } from '../../app/repositories/vocabulary.repository';
import { LessonRepository } from '../../app/repositories/lesson.repository';

@Injectable()
export class KanjiService {
  constructor(
    @Inject(IScrapingService)
    private readonly scrapingService: IScrapingService,
    private vocabularyRepository: VocabularyRepository,
    private lessonRepository: LessonRepository,
  ) {}
  create(createKanjiDto: CreateKanjiDto) {
    return 'This action adds a new kanji';
  }

  findAll(query?: { lessonId: string }) {
    const _query: any = {};
    if (query.lessonId) {
      _query.lessonId = query.lessonId;
    }

    return this.vocabularyRepository.findAll(_query);
  }

  findOne(id: number) {
    return `This action returns a #${id} kanji`;
  }

  update(id: number, updateKanjiDto: UpdateKanjiDto) {
    return `This action updates a #${id} kanji`;
  }

  remove(id: number) {
    return `This action removes a #${id} kanji`;
  }

  async scraping(lessonId: string, categoryId: string, scrapingUrl: string) {
    const lesson = await this.lessonRepository.findOneById(lessonId);

    if (!lesson) {
      return { message: 'fail lesson' };
    }

    let vocabularies: any[] = await this.scrapingService.scrapingKanji(
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

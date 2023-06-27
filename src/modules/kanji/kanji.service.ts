import { Inject, Injectable } from '@nestjs/common';
import { CreateKanjiDto } from './dto/create-kanji.dto';
import { UpdateKanjiDto } from './dto/update-kanji.dto';
import { IScrapingService } from '../../app/services/scraping.service';
import { LessonRepository } from '../../app/repositories/lesson.repository';
import { KanjiRepository } from '../../app/repositories/kanji.repository';

@Injectable()
export class KanjiService {
  constructor(
    @Inject(IScrapingService)
    private readonly scrapingService: IScrapingService,
    private kanjiRepository: KanjiRepository,
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

    return this.kanjiRepository.findAll(_query);
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

  async scraping(lessonId: string) {
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

    await this.kanjiRepository.bulkDelete({
      lessonId: lessonId.toString(),
    });
    await this.kanjiRepository.bulkCreate(vocabularies);

    return { message: 'done' };
  }
}

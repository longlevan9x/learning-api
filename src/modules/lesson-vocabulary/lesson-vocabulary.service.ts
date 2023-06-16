import { Injectable } from '@nestjs/common';
import { CreateLessonVocabularyDto } from './dto/create-lesson-vocabulary.dto';
import { UpdateLessonVocabularyDto } from './dto/update-lesson-vocabulary.dto';
import { ScrapingService } from '../../app/services/scraping.service';
import { LessonVocabularyRepository } from '../../app/repositories/lessonVocabulary.repository';

@Injectable()
export class LessonVocabularyService {
  constructor(
    private scrapingService: ScrapingService,
    private lessonVocabularyRepository: LessonVocabularyRepository
  ) {
  }

  create(createLessonVocabularyDto: CreateLessonVocabularyDto) {
    return 'This action adds a new lessonVocabulary';
  }

  findAll(query?: { lessonId: string }) {
    const _query: any = {};
    if (query.lessonId) {
      _query.lessonId = query.lessonId;
    }

    return this.lessonVocabularyRepository.findAll(_query);
  }

  findOne(id: number) {
    return `This action returns a #${id} lessonVocabulary`;
  }

  update(id: number, updateLessonVocabularyDto: UpdateLessonVocabularyDto) {
    return `This action updates a #${id} lessonVocabulary`;
  }

  remove(id: number) {
    return `This action removes a #${id} lessonVocabulary`;
  }

  async scraping(lessonId: string, scrapingUrl: string) {
    let vocabularies: any[] = await this.scrapingService.scrapingVocabulary(
      scrapingUrl
    );

    vocabularies = vocabularies.map((v) => {
      v.lessonId = lessonId.toString();
      return v;
    });

    await this.lessonVocabularyRepository.bulkDelete({ lessonId });
    await this.lessonVocabularyRepository.bulkCreate(vocabularies);

    return { message: 'done' };
  }
}

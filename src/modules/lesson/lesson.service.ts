import { Inject, Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { LessonRepository } from '../../app/repositories/lesson.repository';
import lesson from '../../app/constants/lesson';
import { CategoryRepository } from '../../app/repositories/category.repository';
import { IScrapingService } from '../../app/services/scraping.service';
import { CategoryModel } from '../../app/schemas/category.schema';

@Injectable()
export class LessonService {
  constructor(
    private lessonRepository: LessonRepository,
    private categoryRepository: CategoryRepository,
    @Inject(IScrapingService)
    private readonly scrapingService: IScrapingService,
  ) {}

  create(createLessonDto: CreateLessonDto) {
    return this.lessonRepository.create(createLessonDto);
  }

  findAll(query?: { categoryId?: string }) {
    const _query: any = {};
    if (query.categoryId) {
      _query.categoryId = query.categoryId;
    }

    return this.lessonRepository.findAll(_query).limit(100);
  }

  findOne(id: number) {
    return `This action returns a #${id} lesson`;
  }

  update(id: string, updateLessonDto: UpdateLessonDto) {
    return this.lessonRepository.update(id, updateLessonDto);
  }

  remove(id: string) {
    return this.lessonRepository.remove(id);
  }

  findAllSubject() {
    return Object.keys(lesson.SUBJECTS);
  }

  async scraping(categoryId: string) {
    const category: CategoryModel = await this.categoryRepository.findOneById(
      categoryId,
    );

    let lessons: any[] = await this.scrapingService.scrapingLesson(
      category.cloneUrl,
      {
        book: category.cloneUrl.replace(/\//g, ''),
      },
    );

    lessons = lessons.map((l) => {
      l.categoryId = categoryId;

      if (category.name === 'Minna') {
        l.subjects = Object.values(lesson.SUBJECTS);
      } else if (category.name === 'Từ vựng') {
        l.subjects = [lesson.SUBJECTS.VOCABULARY];
      } else if (category.name === 'Ngữ pháp') {
        l.subjects = [lesson.SUBJECTS.GRAMMAR];
      } else if (category.name === 'Đọc hiểu') {
        l.subjects = [lesson.SUBJECTS.READING];
      } else if (category.name === 'Nghe hiểu') {
        l.subjects = [lesson.SUBJECTS.LISTENING];
      } else if (category.name === 'Hán tự') {
        l.subjects = [lesson.SUBJECTS.KANJI];
      } else {
        l.subjects = [];
      }

      return l;
    });

    await this.lessonRepository.bulkRemove({ categoryId: categoryId });
    await this.lessonRepository.bulkCreate(lessons);
    console.log('done', lessons);

    return { message: 'done' };
  }
}

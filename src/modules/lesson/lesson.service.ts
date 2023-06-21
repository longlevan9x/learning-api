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

  findAllSection() {
    return Object.keys(lesson.SECTIONS);
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
      return l;
    });

    // await this.lessonRepository.bulkRemove();
    await this.lessonRepository.bulkCreate(lessons);
    console.log('done', lessons);

    return { message: 'done' };
  }
}

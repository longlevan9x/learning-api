import { Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { LessonRepository } from '../../app/repositories/lesson.repository';
import lesson from '../../app/constants/lesson';
import { CategoryRepository } from '../../app/repositories/category.repository';
import { ScrapingService } from '../../app/services/scraping.service';

@Injectable()
export class LessonService {
  constructor(
    private lessonRepository: LessonRepository,
    private categoryRepository: CategoryRepository,
    private scrapingService: ScrapingService,
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
    const category = await this.categoryRepository.findOneById(categoryId);
    let lessons: any[] = await this.scrapingService.scrapingLesson(
      category.cloneUrl,
    );

    lessons = lessons.map((l) => {
      l.categoryId = categoryId;
      return l;
    });

    await this.lessonRepository.bulkCreate(lessons);
    console.log('done');

    return { message: 'done' };
  }
}

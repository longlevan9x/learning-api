import { Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { LessonRepository } from '../../app/repositories/lesson.repository';
import lesson from '../../app/constants/lesson';

@Injectable()
export class LessonService {
  constructor(private lessonRepository: LessonRepository) {}

  create(createLessonDto: CreateLessonDto) {
    return this.lessonRepository.create(createLessonDto);
  }

  findAll() {
    return this.lessonRepository.findAll();
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
}

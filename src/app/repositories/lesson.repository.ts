import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LessonModel } from '../schemas/lesson.schema';
import { CreateLessonDto } from '../../modules/lesson/dto/create-lesson.dto';
import { UpdateLessonDto } from '../../modules/lesson/dto/update-lesson.dto';

@Injectable()
export class LessonRepository {
  constructor(
    @InjectModel(LessonModel.name)
    private lessonModel: Model<LessonModel>,
  ) {}

  findAll() {
    return this.lessonModel.find();
  }

  create(data: CreateLessonDto) {
    return this.lessonModel.create(data);
  }

  update(id: string, data: UpdateLessonDto) {
    return this.lessonModel.findByIdAndUpdate(id, data);
  }

  remove(id: string) {
    return this.lessonModel.findByIdAndDelete(id);
  }

  bulkCreate(listCreate) {
    return this.lessonModel.insertMany(listCreate);
  }
}

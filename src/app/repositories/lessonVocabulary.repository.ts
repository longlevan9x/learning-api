import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LessonVocabularyModel } from '../schemas/lessonVocabulary';
import { UpdateLessonVocabularyDto } from '../../modules/lesson-vocabulary/dto/update-lesson-vocabulary.dto';
import { CreateLessonVocabularyDto } from '../../modules/lesson-vocabulary/dto/create-lesson-vocabulary.dto';

@Injectable()
export class LessonVocabularyRepository {
  constructor(
    @InjectModel(LessonVocabularyModel.name)
    private lessonVocabularyModel: Model<LessonVocabularyModel>,
  ) {}

  findAll() {
    return this.lessonVocabularyModel.find();
  }

  create(data: CreateLessonVocabularyDto) {
    return this.lessonVocabularyModel.create(data);
  }

  update(id: string, data: UpdateLessonVocabularyDto) {
    return this.lessonVocabularyModel.findByIdAndUpdate(id, data);
  }

  remove(id: string) {
    return this.lessonVocabularyModel.findByIdAndDelete(id);
  }

  bulkCreate(listCreate) {
    return this.lessonVocabularyModel.insertMany(listCreate);
  }

  bulkDelete(lessonId) {
    return this.lessonVocabularyModel.deleteMany({
      lessonId: lessonId.toString(),
    });
  }
}

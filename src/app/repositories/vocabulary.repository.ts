import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateVocabularyDto } from 'src/modules/vocabulary/dto/create-vocabulary.dto';
import { UpdateVocabularyDto } from 'src/modules/vocabulary/dto/update-vocabulary.dto';
import { VocabularyModel } from '../schemas/vocabulary.schema';

@Injectable()
export class VocabularyRepository {
  constructor(
    @InjectModel(VocabularyModel.name)
    private vocabularyModel: Model<VocabularyModel>,
  ) {}

  findAll(query?: { lessonId: string } | any) {
    return this.vocabularyModel.find(query).limit(100);
  }

  create(data: CreateVocabularyDto) {
    return this.vocabularyModel.create(data);
  }

  update(id: string, data: UpdateVocabularyDto) {
    return this.vocabularyModel.findByIdAndUpdate(id, data);
  }

  remove(id: string) {
    return this.vocabularyModel.findByIdAndDelete(id);
  }

  bulkCreate(listCreate) {
    return this.vocabularyModel.insertMany(listCreate);
  }

  bulkDelete(query?: any) {
    return this.vocabularyModel.deleteMany(query);
  }
}

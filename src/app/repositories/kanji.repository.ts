import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { KanjiModel } from '../schemas/kanji.schema';
import { CreateKanjiDto } from '../../modules/kanji/dto/create-kanji.dto';
import { UpdateKanjiDto } from '../../modules/kanji/dto/update-kanji.dto';

@Injectable()
export class KanjiRepository {
  constructor(
    @InjectModel(KanjiModel.name)
    private kanjiModel: Model<KanjiModel>,
  ) {}

  findAll(query?: { lessonId: string } | any) {
    return this.kanjiModel.find(query);
  }

  create(data: CreateKanjiDto) {
    return this.kanjiModel.create(data);
  }

  update(id: string, data: UpdateKanjiDto) {
    return this.kanjiModel.findByIdAndUpdate(id, data);
  }

  remove(id: string) {
    return this.kanjiModel.findByIdAndDelete(id);
  }

  bulkCreate(listCreate) {
    return this.kanjiModel.insertMany(listCreate);
  }

  bulkDelete(query?: any) {
    return this.kanjiModel.deleteMany(query);
  }
}

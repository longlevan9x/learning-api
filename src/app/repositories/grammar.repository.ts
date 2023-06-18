import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGrammarDto } from 'src/modules/grammar/dto/create-grammar.dto';
import { UpdateGrammarDto } from 'src/modules/grammar/dto/update-grammar.dto';
import { GrammarModel } from '../schemas/grammar.schema';

@Injectable()
export class GrammarRepository {
  constructor(
    @InjectModel(GrammarModel.name)
    private grammarModel: Model<GrammarModel>,
  ) {}

  findAll(query?: { lessonId: string } | any) {
    return this.grammarModel.find(query);
  }

  create(data: CreateGrammarDto) {
    return this.grammarModel.create(data);
  }

  update(id: string, data: UpdateGrammarDto) {
    return this.grammarModel.findByIdAndUpdate(id, data);
  }

  remove(id: string) {
    return this.grammarModel.findByIdAndDelete(id);
  }

  bulkCreate(listCreate) {
    return this.grammarModel.insertMany(listCreate);
  }

  bulkDelete(lessonId) {
    return this.grammarModel.deleteMany({
      lessonId: lessonId.toString(),
    });
  }
}

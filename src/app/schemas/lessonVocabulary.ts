import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LessonVocabularyDocument = HydratedDocument<LessonVocabularyModel>;

@Schema()
export class LessonVocabularyModel {
  @Prop()
  name: string;

  @Prop()
  lessonId: string;

  @Prop()
  vocabulary: string;

  @Prop()
  kanji: string;
  @Prop()
  vietnam_sound: string;

  @Prop()
  mean: string;

  @Prop()
  mediaUrl: string;

  @Prop()
  cloneUrl: string;
}

export const LessonVocabularySchema = SchemaFactory.createForClass(
  LessonVocabularyModel,
);
export const LessonVocabularyTableName = 'lesson_vocabularies';
export const LessonVocabularySchemaModule = MongooseModule.forFeature([
  {
    name: LessonVocabularyModel.name,
    schema: LessonVocabularySchema,
    collection: LessonVocabularyTableName,
  },
]);

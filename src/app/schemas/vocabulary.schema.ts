import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type VocabularyDocument = HydratedDocument<VocabularyModel>;

@Schema()
export class VocabularyModel {
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

  @Prop()
  vocabularyType: string[];
}

export const VocabularySchema = SchemaFactory.createForClass(VocabularyModel);
export const VocabularyTableName = 'vocabularies';
export const VocabularySchemaModule = MongooseModule.forFeature([
  {
    name: VocabularyModel.name,
    schema: VocabularySchema,
    collection: VocabularyTableName,
  },
]);

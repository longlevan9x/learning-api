import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type KanjiDocument = HydratedDocument<KanjiModel>;

@Schema()
export class KanjiModel {
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
  vocabularyType: string[];
}

export const KanjiSchema = SchemaFactory.createForClass(KanjiModel);
export const KanjiTableName = 'kanjis';
export const KanjiSchemaModule = MongooseModule.forFeature([
  {
    name: KanjiModel.name,
    schema: KanjiSchema,
    collection: KanjiTableName,
  },
]);

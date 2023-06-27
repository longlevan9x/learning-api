import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LessonDocument = HydratedDocument<LessonModel>;

@Schema()
export class LessonModel {
  @Prop()
  name: string;

  @Prop()
  bookId: string;

  @Prop()
  categoryId: string;

  @Prop()
  cloneUrl: string;

  @Prop()
  bookName: string;

  @Prop()
  subjects: string[];
}

export const LessonSchema = SchemaFactory.createForClass(LessonModel);
export const LessonTableName = 'lessons';
export const LessonSchemaModule = MongooseModule.forFeature([
  {
    name: LessonModel.name,
    schema: LessonSchema,
    collection: LessonTableName,
  },
]);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LessonDocument = HydratedDocument<LessonModel>;

@Schema()
export class LessonModel {
  @Prop()
  name: string;

  @Prop()
  bookId: string;

  @Prop()
  lessonType: string;
}

export const LessonSchema = SchemaFactory.createForClass(LessonModel);
export const LessonTableName = 'lessons';

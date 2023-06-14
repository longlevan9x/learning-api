import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BookDocument = HydratedDocument<BookModel>;

@Schema()
export class BookModel {
  @Prop()
  name: string;

  @Prop()
  categoryId: string;
}

export const BookSchema = SchemaFactory.createForClass(BookModel);
export const BookTableName = 'books';

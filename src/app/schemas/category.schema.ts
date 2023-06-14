import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<CategoryModel>;

@Schema()
export class CategoryModel {
  @Prop()
  name: string;

  @Prop()
  parentId: string;
}

export const CategorySchema = SchemaFactory.createForClass(CategoryModel);
export const CategoryTableName = 'categories';

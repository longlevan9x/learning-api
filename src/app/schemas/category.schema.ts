import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<CategoryModel>;

@Schema()
export class CategoryModel {
  @Prop()
  name: string;

  @Prop()
  parentId: string;

  @Prop()
  cloneUrl: string;
}

export const CategorySchema = SchemaFactory.createForClass(CategoryModel);
export const CategoryTableName = 'categories';

export const CategorySchemaModule = MongooseModule.forFeature([
  {
    name: CategoryModel.name,
    schema: CategorySchema,
    collection: CategoryTableName,
  },
]);

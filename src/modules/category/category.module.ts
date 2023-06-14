import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CategoryModel,
  CategorySchema,
  CategoryTableName,
} from '../../app/schemas/category.schema';
import { CategoryRepository } from '../../app/repositories/category.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CategoryModel.name,
        schema: CategorySchema,
        collection: CategoryTableName,
      },
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository],
})
export class CategoryModule {}

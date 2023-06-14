import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CategorySchema,
  CategoryTableName,
} from '../../app/schemas/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CategoryTableName, schema: CategorySchema },
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}

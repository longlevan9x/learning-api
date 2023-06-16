import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import {
  CategorySchemaModule,
} from '../../app/schemas/category.schema';
import { CategoryRepository } from '../../app/repositories/category.repository';
import { ScrapingService } from 'src/app/services/scraping.service';

@Module({
  imports: [CategorySchemaModule],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository, ScrapingService],
})
export class CategoryModule {}

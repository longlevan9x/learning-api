import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryModel } from '../schemas/category.schema';
import { UpdateCategoryDto } from '../../modules/category/dto/update-category.dto';
import { CreateCategoryDto } from '../../modules/category/dto/create-category.dto';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectModel(CategoryModel.name)
    private categoryModel: Model<CategoryModel>,
  ) {}

  findAll() {
    return this.categoryModel.find();
  }

  findOneById(id) {
    return this.categoryModel.findById(id);
  }

  create(data: CreateCategoryDto) {
    return this.categoryModel.create(data);
  }

  update(id: string, data: UpdateCategoryDto) {
    return this.categoryModel.findByIdAndUpdate(id, data);
  }

  remove(id: string) {
    return this.categoryModel.findByIdAndDelete(id);
  }

  removeAll() {
    return this.categoryModel.deleteMany({});
  }

  bulkCreate(listCate) {
    return this.categoryModel.insertMany(listCate);
  }
}

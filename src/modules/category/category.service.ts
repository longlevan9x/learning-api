import { Injectable } from '@nestjs/common';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateBookDto } from '../book/dto/create-book.dto';
import { CategoryRepository } from '../../app/repositories/category.repository';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}
  create(createBookDto: CreateBookDto) {
    return this.categoryRepository.create(createBookDto);
  }

  findAll() {
    return this.categoryRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryRepository.update(id, updateCategoryDto);
  }
  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}

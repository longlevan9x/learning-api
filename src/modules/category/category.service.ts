import { Injectable } from '@nestjs/common';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from '../../app/repositories/category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PuppeteerService } from '../../app/services/puppeteer.service';

@Injectable()
export class CategoryService {
  constructor(
    private categoryRepository: CategoryRepository,
    private scrapingService: PuppeteerService,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepository.create(createCategoryDto);
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

  remove(id: string) {
    return this.categoryRepository.remove(id);
  }

  async clone() {
    const categories = this.scrapingService.scrapingCategory();
    await this.categoryRepository.removeAll();

    await this.insertCategories(categories, '');
    console.log('done');
  }

  async insertCategories(categories, parentId = '') {
    for (const category of categories) {
      const _category: any = {
        name: category.name.trim(),
        parentId: parentId,
        cloneUrl: category.cloneUrl,
      };

      const cate = await this.categoryRepository.create(_category);

      if (category.children.length) {
        await this.insertCategories(category.children, cate._id.toString());
      }
    }
  }
}

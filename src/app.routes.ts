import { Routes } from '@nestjs/core';
import { BookModule } from './modules/book/book.module';
import { CategoryModule } from './modules/category/category.module';

export const appRoutes: Routes = [
  {
    path: 'books',
    module: BookModule,
  },
  {
    path: 'categories',
    module: CategoryModule,
  },
];

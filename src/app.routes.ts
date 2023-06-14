import { Routes } from '@nestjs/core';
import { BookModule } from './modules/book/book.module';
import { CategoryModule } from './modules/category/category.module';
import { LessonModule } from './modules/lesson/lesson.module';

export const appRoutes: Routes = [
  {
    path: 'books',
    module: BookModule,
  },
  {
    path: 'categories',
    module: CategoryModule,
  },
  {
    path: 'lessons',
    module: LessonModule,
  },
];

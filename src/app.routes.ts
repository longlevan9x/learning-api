import { Routes } from '@nestjs/core';
import { BookModule } from './modules/book/book.module';

export const appRoutes: Routes = [
  {
    path: 'books',
    module: BookModule,
  },
];

import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  BookModel,
  BookSchema,
  BookTableName,
} from '../../app/schemas/book.schema';
import { BookRepository } from '../../app/repositories/book.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BookModel.name, schema: BookSchema, collection: BookTableName },
    ]),
  ],
  controllers: [BookController],
  providers: [BookService, BookRepository],
})
export class BookModule {}

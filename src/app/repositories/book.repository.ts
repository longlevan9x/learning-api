import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BookModel } from '../schemas/book.schema';
import { Model } from 'mongoose';
import { CreateBookDto } from '../../modules/book/dto/create-book.dto';
import { UpdateBookDto } from '../../modules/book/dto/update-book.dto';

@Injectable()
export class BookRepository {
  constructor(
    @InjectModel(BookModel.name) private bookModel: Model<BookModel>
  ) {
  }

  findAll() {
    return this.bookModel.find();
  }

  create(data: CreateBookDto) {
    return this.bookModel.create(data);
  }

  update(id: string, data: UpdateBookDto) {
    return this.bookModel.findByIdAndUpdate(id, data);
  }
}

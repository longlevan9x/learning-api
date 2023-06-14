import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookRepository } from '../../app/repositories/book.repository';

@Injectable()
export class BookService {
  constructor(private bookRepository: BookRepository) {
  }

  create(createBookDto: CreateBookDto) {
    return this.bookRepository.create(createBookDto);
  }

  findAll() {
    return this.bookRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: string, updateBookDto: UpdateBookDto) {
    return this.bookRepository.update(id, updateBookDto);
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}

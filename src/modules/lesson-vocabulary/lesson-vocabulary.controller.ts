import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LessonVocabularyService } from './lesson-vocabulary.service';
import { CreateLessonVocabularyDto } from './dto/create-lesson-vocabulary.dto';
import { UpdateLessonVocabularyDto } from './dto/update-lesson-vocabulary.dto';

@Controller()
export class LessonVocabularyController {
  constructor(
    private readonly lessonVocabularyService: LessonVocabularyService,
  ) {}

  @Post()
  create(@Body() createLessonVocabularyDto: CreateLessonVocabularyDto) {
    return this.lessonVocabularyService.create(createLessonVocabularyDto);
  }

  @Get()
  findAll() {
    return this.lessonVocabularyService.findAll();
  }

  @Post('/scraping')
  scraping(@Body() body) {
    return this.lessonVocabularyService.scraping(
      body.lessonId,
      body.scrapingUrl,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonVocabularyService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLessonVocabularyDto: UpdateLessonVocabularyDto,
  ) {
    return this.lessonVocabularyService.update(+id, updateLessonVocabularyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonVocabularyService.remove(+id);
  }
}

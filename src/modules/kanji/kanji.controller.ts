import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { KanjiService } from './kanji.service';
import { CreateKanjiDto } from './dto/create-kanji.dto';
import { UpdateKanjiDto } from './dto/update-kanji.dto';

@Controller()
export class KanjiController {
  constructor(private readonly kanjiService: KanjiService) {}

  @Post()
  create(@Body() createKanjiDto: CreateKanjiDto) {
    return this.kanjiService.create(createKanjiDto);
  }

  @Get()
  findAll(@Query() query) {
    return this.kanjiService.findAll(query);
  }

  @Post('/scraping')
  scraping(@Body() body) {
    return this.kanjiService.scraping(body.lessonId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kanjiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKanjiDto: UpdateKanjiDto) {
    return this.kanjiService.update(+id, updateKanjiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kanjiService.remove(+id);
  }
}

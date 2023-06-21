import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ScraperService } from './scraper.service';
import { CreateScraperDto } from './dto/create-scraper.dto';
import { UpdateScraperDto } from './dto/update-scraper.dto';

@Controller('scrapers')
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {}

  @Post()
  create(@Body() createScraperDto: CreateScraperDto) {
    return this.scraperService.create(createScraperDto);
  }

  @Get()
  findAll() {
    return this.scraperService.findAll();
  }

  @Get('scraping')
  scraping() {
    return this.scraperService.scraping();
  }

  @Get('vocabulary')
  scrapingVocabulary() {
    return this.scraperService.scrapingVocabulary();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scraperService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScraperDto: UpdateScraperDto) {
    return this.scraperService.update(+id, updateScraperDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scraperService.remove(+id);
  }
}

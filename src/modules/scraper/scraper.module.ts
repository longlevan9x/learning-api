import { Module } from '@nestjs/common';
import { ScraperService } from './scraper.service';
import { ScraperController } from './scraper.controller';
import { ScrapingService } from 'src/app/services/scraping.service';

@Module({
  controllers: [ScraperController],
  providers: [ScraperService, ScrapingService],
})
export class ScraperModule {}

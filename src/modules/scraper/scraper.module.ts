import { Module } from '@nestjs/common';
import { ScraperService } from './scraper.service';
import { ScraperController } from './scraper.controller';
import { ScrapingServiceInterface } from '../../app/services/scraping.service';

@Module({
  controllers: [ScraperController],
  providers: [ScraperService, ScrapingServiceInterface],
})
export class ScraperModule {}

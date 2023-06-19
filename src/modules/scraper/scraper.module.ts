import { Module } from '@nestjs/common';
import { ScraperService } from './scraper.service';
import { ScraperController } from './scraper.controller';
import { PuppeteerService } from 'src/app/services/puppeteer.service';
import { ScrapingServiceInterface } from '../../app/services/scraping.service';

@Module({
  controllers: [ScraperController],
  providers: [ScraperService, PuppeteerService, ScrapingServiceInterface],
})
export class ScraperModule {}

import { CheerioService } from './cheerio.service';
import { PuppeteerService } from './puppeteer.service';

export interface IScrapingService {
  scraping(): string;
}

export const ScrapingServiceInterface = {
  provide: 'ScrapingServiceInterface',
  useClass: PuppeteerService,
};
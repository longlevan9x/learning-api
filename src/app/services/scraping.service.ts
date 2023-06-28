import { CheerioService } from './cheerio.service';
import { PuppeteerService } from './puppeteer.service';
import { Inject } from '@nestjs/common';

export interface IScrapingService {
  scraping(): string;
  scrapingVocabulary(scrapingUrl: string): Promise<any[]>;
  scrapingKanji(scrapingUrl: string): Promise<any[]>;
  scrapingCategory(): Promise<any[]>;
  scrapingLesson(scrapingUrl: string): Promise<any[]>;
  scrapingLesson(scrapingUrl: string, extra?: { book: string }): Promise<any[]>;
  scrapingGrammar(scrapingUrl: string): Promise<any[]>;
  scrapingPageHtml(url: string): Promise<string>;
  scrapingConversation(scrapingUrl: string): Promise<any>;
}

export const IScrapingService = Symbol('IScrapingService');

export const ScrapingServiceInterface = {
  provide: IScrapingService,
  useClass: CheerioService,
};

// export const InjectIScrapingService = Inject('IScrapingService');

import { Injectable } from '@nestjs/common';
import { IScrapingService } from './scraping.service';

@Injectable()
export class CheerioService implements IScrapingService {
  scraping(): string {
    return '12312';
  }
}

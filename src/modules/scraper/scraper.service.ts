import { Injectable } from '@nestjs/common';
import { CreateScraperDto } from './dto/create-scraper.dto';
import { UpdateScraperDto } from './dto/update-scraper.dto';
import { ScrapingService } from '../../app/services/scraping.service';
import * as path from 'node:path';
import * as fs from 'fs';
import * as url from 'url';

@Injectable()
export class ScraperService {
  minnaUrlVocabularies = [];

  constructor(private scrapingService: ScrapingService) {}

  create(createScraperDto: CreateScraperDto) {
    return 'This action adds a new scraper';
  }

  saveFile(pathFile, data) {
    const pathFiles = pathFile.split('\\');
    const fileName = pathFiles[pathFiles.length - 1];
    const pathName = pathFile.replace(fileName, '');

    const fullpath = path.join(process.cwd(), 'html\\' + pathName);
    if (!fs.existsSync(fullpath)) {
      fs.mkdirSync(fullpath, { recursive: true });
    }

    return fs.writeFileSync(fullpath + '\\' + fileName, data, {
      flag: 'w',
    });
  }

  async scraping() {
    // const section = 'ngu-phap';
    // const section = 'tu-vung';
    const book = 'minna-no-nihongo';
    const sections = [
      // 'hoi-thoai',
      // 'luyen-doc',
      'luyen-nghe',
      'bai-tap',
      'han-tu',
      '25-bai-doc-hieu',
      'kiem-tra',
      'tham-khao',
    ];

    for (const section of sections) {
      for (let i = 1; i <= 50; i++) {
        const url = `${book}/bai-${i}-${section}.html`;
        this.minnaUrlVocabularies.push(url);

        const html = await this.scrapingService.scrapingPageHtml(url);

        this.saveFile(`\\${book}\\${section}\\bai-${i}-${section}.html`, html);
      }
    }

    return { message: 'done' };
  }

  findAll() {
    return `This action returns all scraper`;
  }

  findOne(id: number) {
    return `This action returns a #${id} scraper`;
  }

  update(id: number, updateScraperDto: UpdateScraperDto) {
    return `This action updates a #${id} scraper`;
  }

  remove(id: number) {
    return `This action removes a #${id} scraper`;
  }
}

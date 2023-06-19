import { Inject, Injectable } from '@nestjs/common';
import { CreateScraperDto } from './dto/create-scraper.dto';
import { UpdateScraperDto } from './dto/update-scraper.dto';
import { PuppeteerService } from '../../app/services/puppeteer.service';
import * as path from 'node:path';
import * as fs from 'fs';
import { IScrapingService } from '../../app/services/scraping.service';

@Injectable()
export class ScraperService {
  minnaUrlVocabularies = [];

  constructor(
    private puppeteerService: PuppeteerService,
    @Inject('ScrapingServiceInterface')
    private readonly scrapingService: IScrapingService,
  ) {}

  test() {
    return this.scrapingService.scraping();
  }

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
    return { message: 'done' };

    const book = 'somatome-n3';
    // const book = 'somatome-n2';
    const sections = [
      // 'tu-vung',
      // 'ngu-phap',
      // 'han-tu',
      // 'doc-hieu',
      // 'nghe-hieu',
    ];

    const scraping = async (section, week, lesson) => {
      if (week === 1 && lesson === 1) {
        lesson = '';
      } else {
        lesson = `-${lesson}`;
      }

      const url = `${book}-${section}/tuan-${week}${lesson}.html`;
      this.minnaUrlVocabularies.push(url);

      const html = await this.puppeteerService.scrapingPageHtml(url);

      this.saveFile(
        `\\${book}\\${section}\\tuan-${week}${lesson || '-1'}-${section}.html`,
        html,
      );
    };

    const scrapingNgheHieu = async (url, section) => {
      this.minnaUrlVocabularies.push(url);
      const _us = url.split('/');
      const _u = _us[_us.length - 1].replace('.html', '');
      const html = await this.puppeteerService.scrapingPageHtml(url);
      this.saveFile(`\\${book}\\${section}\\${_u}-${section}.html`, html);
    };

    for (const section of sections) {
      // nghe hieu
      // const urls = await this.puppeteerService.scrapingSoumatomeNgheHieuUrl(
      //   `${book}-${section}`,
      // );
      //
      // for (const index in urls) {
      //   await Promise.all([scrapingNgheHieu(urls[index], section)]);
      // }

      for (let i = 1; i <= 6; i++) {
        for (let j = 1; j <= 7; j += 1) {
          await Promise.all([scraping(section, i, j)]);
        }
      }
    }

    return { message: 'done' };
  }

  async scrapingMinna() {
    // const section = 'ngu-phap';
    // const section = 'tu-vung';
    const book = 'minna-no-nihongo';
    const sections = [
      // 'hoi-thoai',
      // 'luyen-doc',
      // 'luyen-nghe',
      // 'bai-tap',
      // 'han-tu',
      '25-bai-doc-hieu',
      // 'kiem-tra',
      // 'tham-khao',
    ];

    const scraping = async (section, lesson) => {
      if (lesson < 10) {
        lesson = `0${lesson}`;
      }

      const url = `${book}/bai-${lesson}-${section}.html`;
      this.minnaUrlVocabularies.push(url);

      const html = await this.puppeteerService.scrapingPageHtml(url);

      this.saveFile(
        `\\${book}\\${section}\\bai-${lesson}-${section}.html`,
        html,
      );
    };

    for (const section of sections) {
      for (let i = 1; i <= 50; i += 2) {
        await Promise.all([scraping(section, i), scraping(section, i + 1)]);
        // const url = `${book}/bai-${i}-${section}.html`;
        // this.minnaUrlVocabularies.push(url);
        //
        // const html = await this.puppeteerService.scrapingPageHtml(url);
        //
        // this.saveFile(`\\${book}\\${section}\\bai-${i}-${section}.html`, html);
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

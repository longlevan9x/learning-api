import { Inject, Injectable } from '@nestjs/common';
import { CreateScraperDto } from './dto/create-scraper.dto';
import { UpdateScraperDto } from './dto/update-scraper.dto';
import * as path from 'node:path';
import * as fs from 'fs';
import { IScrapingService } from '../../app/services/scraping.service';

@Injectable()
export class ScraperService {
  minnaUrlVocabularies = [];

  constructor(
    @Inject(IScrapingService)
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

  async scrapingSection() {
    // return { message: 'done' };

    const books = [
      {
        name: 'minna-no-nihongo',
      },
      {
        name: 'somatome-n2',
        sections: ['tu-vung', 'ngu-phap', 'han-tu', 'doc-hieu', 'nghe-hieu'],
      },
      {
        name: 'somatome-n3',
        sections: ['tu-vung', 'ngu-phap', 'han-tu', 'doc-hieu', 'nghe-hieu'],
      },
    ];

    for (const book of books) {
      if (book.sections?.length) {
        for (const section of book.sections) {
          const url = book.name + `-${section}`;
          const html = await this.scrapingService.scrapingPageHtml(url);
          this.saveFile(`\\${book.name}-${section}.html`, html);
        }
      } else {
        const url = book.name;
        const html = await this.scrapingService.scrapingPageHtml(url);
        this.saveFile(`\\${book.name}.html`, html);
      }
    }

    return { message: 'done' };
  }
  async scraping() {
    return { message: 'done' };
  }

  async scrapingMinna() {
    const book = 'minna-no-nihongo';
    const sections = [
      'tu-vung',
      'ngu-phap',
      'hoi-thoai',
      'luyen-doc',
      'luyen-nghe',
      'bai-tap',
      'han-tu',
      '25-bai-doc-hieu',
      'kiem-tra',
      'tham-khao',
    ];

    for (const section of sections) {
      for (let i = 1; i <= 50; i += 2) {
        await Promise.all([
          this.__scrapingMina(book, section, i),
          this.__scrapingMina(book, section, i + 1),
        ]);
      }
    }

    return { message: 'done' };
  }

  async scrapingN2Soumatome() {
    const book = 'somatome-n2';
    const sections = ['tu-vung', 'ngu-phap', 'han-tu'];

    for (const section of sections) {
      for (let i = 1; i <= 8; i++) {
        for (let j = 1; j <= 7; j += 1) {
          await Promise.all([this.__scrapingSoumatome(book, section, i, j)]);
        }
      }
    }
  }

  async scrapingN2SoumatomeDocHieu() {
    const book = 'somatome-n2';
    const sections = ['doc-hieu'];

    for (const section of sections) {
      for (let i = 1; i <= 6; i++) {
        for (let j = 1; j <= 7; j += 1) {
          await Promise.all([this.__scrapingSoumatome(book, section, i, j)]);
        }
      }
    }
  }

  async scrapingN2SoumatomeNgheHieu() {
    const book = 'somatome-n2';
    const sections = ['nghe-hieu'];

    const scrapingNgheHieu = async (url, section) => {
      this.minnaUrlVocabularies.push(url);
      const _us = url.split('/');
      const _u = _us[_us.length - 1].replace('.html', '');
      const html = await this.scrapingService.scrapingPageHtml(url);
      this.saveFile(`\\${book}\\${section}\\${_u}-${section}.html`, html);
    };

    // for (const section of sections) {
    //   const urls = await this.scrapingService.scrapingSoumatomeNgheHieuUrl(
    //     `${book}-${section}`,
    //   );
    //
    //   for (const index in urls) {
    //     await Promise.all([scrapingNgheHieu(urls[index], section)]);
    //   }
    // }
  }

  async scrapingN3Soumatome() {
    const book = 'somatome-n3';
    const sections = ['tu-vung', 'ngu-phap', 'han-tu', 'doc-hieu'];

    for (const section of sections) {
      for (let i = 1; i <= 6; i++) {
        for (let j = 1; j <= 7; j += 1) {
          await Promise.all([this.__scrapingSoumatome(book, section, i, j)]);
        }
      }
    }
  }

  scrapingN3SoumatomeNgheHieu() {
    const book = 'somatome-n3';
    const sections = ['nghe-hieu'];

    const scrapingNgheHieu = async (url, section) => {
      this.minnaUrlVocabularies.push(url);
      const _us = url.split('/');
      const _u = _us[_us.length - 1].replace('.html', '');
      const html = await this.scrapingService.scrapingPageHtml(url);
      this.saveFile(`\\${book}\\${section}\\${_u}-${section}.html`, html);
    };

    for (const section of sections) {
      //   const urls = await this.scrapingService.scrapingSoumatomeNgheHieuUrl(
      //     `${book}-${section}`,
      //   );
      //
      //   for (const index in urls) {
      //     await Promise.all([scrapingNgheHieu(urls[index], section)]);
      //   }
    }
  }

  scrapingVocabulary() {
    return this.scrapingService.scrapingVocabulary('');
  }
  async __scrapingSoumatome(book, section, week, lesson) {
    if (week === 1 && lesson === 1) {
      lesson = '';
    } else {
      lesson = `-${lesson}`;
    }

    const url = `${book}-${section}/tuan-${week}${lesson}.html`;
    this.minnaUrlVocabularies.push(url);

    const html = await this.scrapingService.scrapingPageHtml(url);

    this.saveFile(`\\${book}-${section}\\tuan-${week}${lesson}.html`, html);
  }
  async __scrapingMina(book, section, lesson) {
    if (section === '25-bai-doc-hieu' && lesson < 10) {
      lesson = `0${lesson}`;
    }

    const url = `${book}/bai-${lesson}-${section}.html`;
    this.minnaUrlVocabularies.push(url);

    const html = await this.scrapingService.scrapingPageHtml(url);

    this.saveFile(`\\${book}\\bai-${lesson}-${section}.html`, html);
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

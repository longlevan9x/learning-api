import { Injectable, Logger } from '@nestjs/common';
import { IScrapingService } from './scraping.service';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class CheerioService implements IScrapingService {
  private readonly logger = new Logger(CheerioService.name);

  baseUrl = 'https://longlevan9x.github.io/html-page';

  scraping(): string {
    return '12312';
  }

  async scrapingVocabulary(scrapingUrl: string): Promise<any> {
    let url = this.baseUrl + scrapingUrl;

    if (scrapingUrl.includes('minna')) {
      url = url.replace('.html', '-tu-vung.html');
    }

    this.logger.log('scrapingVocabulary ' + url);
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const vocabularies = [];
    if (scrapingUrl.includes('minna')) {
      $('.search_result tbody')
        .find('tr')
        .each((index, el) => {
          const childLength = $(el).children().length;
          const childrenElement = $(el).children();
          if (childLength === 5) {
            const vocabulary = {
              vocabulary: childrenElement.eq(0).text().trim(),
              kanji: childrenElement.eq(1).text().trim(),
              vietnam_sound: childrenElement.eq(2).text().trim(),
              mediaUrl: childrenElement.eq(3).find('audio').attr('src'),
              mean: childrenElement.eq(4).text().trim(),
            };

            vocabularies.push(vocabulary);
          } else if (childLength === 3) {
            const vocabulary = {
              vocabulary: childrenElement.eq(0).text().trim(),
              mediaUrl: childrenElement.eq(1).find('audio').attr('src'),
              mean: childrenElement.eq(2).text().trim(),
            };

            vocabularies.push(vocabulary);
          }
        });
    } else if (scrapingUrl.includes('somatome')) {
      $('div#tab3 > table.khung2 > tbody tr').each((index, el) => {
        const childrenElement = $(el).children();
        const vocabulary = {
          vocabulary: childrenElement.eq(0).text().trim(),
          kanji: childrenElement.eq(1).text().trim(),
          vocabularyType: childrenElement
            .eq(2)
            .text()
            .trim()
            .replace(/\s/g, '')
            .split(','),
          mean: childrenElement.eq(3).text().trim(),
        };

        vocabularies.push(vocabulary);
      });
    }

    this.logger.log('scrapingVocabulary: done');
    return vocabularies;
  }

  async scrapingCategory(): Promise<any[]> {
    return Promise.resolve([]);
  }

  async scrapingLesson(
    scrapingUrl: string,
    extra?: { book: string },
  ): Promise<any[]> {
    const url = this.baseUrl + `/${extra.book}.html`;
    this.logger.log(url);
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const lessons = [];

    $('.category tr > td > a').each((index, el) => {
      lessons.push({
        cloneUrl: $(el).attr('href'),
        name: $(el).text(),
        bookName: extra.book,
      });
    });

    return lessons;
  }

  async scrapingPageHtml(url: string): Promise<string> {
    return Promise.resolve('');
  }

  scrapingGrammar(scrapingUrl: string): Promise<any[]> {
    return Promise.resolve([]);
  }

  async scrapingKanji(scrapingUrl: string): Promise<any[]> {
    let url = this.baseUrl + scrapingUrl;

    if (scrapingUrl.includes('minna')) {
      url = url.replace('.html', '-han-tu.html');
    }

    this.logger.log('scrapingKanji ' + url);
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const kanjis = [];
    if (scrapingUrl.includes('minna')) {
      $('.search_result tbody')
        .find('tr')
        .each((index, el) => {
          const childrenElement = $(el).children();

          const kanji = {
            kanji: childrenElement.eq(0).text().trim(),
            vietnam_sound: childrenElement.eq(1).text().trim(),
            vocabulary: childrenElement.eq(2).text().trim(),
          };

          kanjis.push(kanji);
        });
    } else if (scrapingUrl.includes('somatome')) {
      $('div#tab3 > table.khung2 > tbody tr').each((index, el) => {
        const childrenElement = $(el).children();
        const kanji = {
          kanji: childrenElement.eq(0).text().trim(),
          vietnam_sound: childrenElement.eq(1).text().trim(),
          vocabulary: childrenElement.eq(2).text().trim(),
          mean: childrenElement.eq(3).text().trim(),
        };

        kanjis.push(kanji);
      });
    }

    this.logger.log('scrapingKanji: done');

    return kanjis;
  }
}

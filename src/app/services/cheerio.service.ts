import { Injectable, Logger } from '@nestjs/common';
import { IScrapingService } from './scraping.service';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { index } from 'cheerio/lib/api/traversing';

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

  async scrapingGrammar(scrapingUrl: string): Promise<any[]> {
    let url = this.baseUrl + scrapingUrl;

    if (scrapingUrl.includes('minna')) {
      url = url.replace('.html', '-ngu-phap.html');
    }

    this.logger.log('scrapingGrammar ' + url);

    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const grammars = [];

    if (scrapingUrl.includes('minna')) {
      $('div.tab_content#tab3 .slide').each((index, el) => {
        const grammarTitle = $(el).find('.slide-title').text();

        const labels = [
          'Cấu trúc',
          'Ý nghĩa',
          'Giải thích & Hướng dẫn',
          'Ví dụ',
        ];

        const listMapping = [];

        $(el)
          .find('.slide-content .khung > tbody > tr')
          .each((index, el) => {
            let tdTextIndex = 1;
            if ($(el).children().length === 1) {
              tdTextIndex = 0;
            }

            const tdText = $(el).children().eq(tdTextIndex).text().trim();
            if (labels.includes(tdText)) {
              listMapping.push({ title: tdText });
            } else {
              const lastIndex = listMapping.length - 1;
              if (listMapping[lastIndex].title === 'Ví dụ') {
                if (!listMapping[lastIndex]?.content?.length) {
                  listMapping[lastIndex].content = [];
                }

                const wordRaw = $(el).find('.tudich .candich').text();
                const wordTranslate = $(el)
                  .find('.tudich .kqdich .nddich')
                  .text();

                listMapping[lastIndex].content.push({
                  wordRaw,
                  wordTranslate,
                });
              } else {
                listMapping[lastIndex].content = $(el).find('td').eq(1).html();
              }
            }
          });

        const keyLabel = {
          ['Cấu trúc']: 'structure',
          ['Ý nghĩa']: 'mean',
          ['Giải thích & Hướng dẫn']: 'explain',
          ['Ví dụ']: 'examples',
        };

        const objectMapping = listMapping.reduce((newObj, listChild) => {
          newObj[keyLabel[listChild.title]] = listChild.content;
          return newObj;
        }, {});

        objectMapping.title = grammarTitle;
        grammars.push(objectMapping);
      });
    }

    return grammars;
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

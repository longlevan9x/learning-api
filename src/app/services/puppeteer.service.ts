import { Injectable } from '@nestjs/common';
import puppeteer, { Page } from 'puppeteer';
import { IScrapingService } from './scraping.service';

// import chromium from 'chrome-aws-lambda';

@Injectable()
export class PuppeteerService implements IScrapingService {
  scraping(): string {
    return '34534543';
  }

  baseUrl = 'https://www.vnjpclub.com/';

  async launchBrowser() {
    const options: any = {
      args: ['--hide-scrollbars', '--disable-web-security'],
      headless: false,
      ignoreHTTPSErrors: true,
    };

    // return await chromium.puppeteer.launch({
    //   args: [...chromium.args, '--hide-scrollbars', '--disable-web-security'],
    //   defaultViewport: chromium.defaultViewport,
    //   executablePath: await chromium.executablePath,
    //   headless: true,
    //   ignoreHTTPSErrors: true,
    // });

    return await puppeteer.launch(options);
  }

  async scrapingSoumatomeNgheHieuUrl(url) {
    const browser = await this.launchBrowser();
    const page = await browser.newPage();

    await page.goto(this.baseUrl + url, { waitUntil: 'networkidle0' });
    // await page.goto(this.baseUrl + url, { waitUntil: 'domcontentloaded' });
    // Set screen size
    // await page.setViewport({ width: 500, height: 500 });
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36',
    );

    const urls = await page.$$eval(
      '#rt-mainbody .category-list .category tr td a',
      (elements) => elements.map((element) => element.getAttribute('href')),
    );

    await browser.close();

    return urls;
  }

  async scrapingPageHtml(url: string) {
    const browser = await this.launchBrowser();
    const page = await browser.newPage();

    await page.goto(this.baseUrl + url, { waitUntil: 'networkidle0' });
    // await page.goto(this.baseUrl + url, { waitUntil: 'domcontentloaded' });
    // Set screen size
    // await page.setViewport({ width: 500, height: 500 });
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36',
    );

    // const html = await page.content();
    const html = await page.$eval('#rt-mainbody', (element) => {
      return element.innerHTML;
    });

    await browser.close();

    return html;
  }

  async scrapingCategory() {
    const browser = await this.launchBrowser();
    const page = await browser.newPage();

    await page.goto(this.baseUrl);
    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36',
    );

    const categories: any = await page.$$eval(
      '.menu-block > ul > li',
      (elements) => {
        const data = [];
        const getMenu = (elements: any[], selector: string, data: any) => {
          elements.forEach((li: HTMLElement) => {
            const className = li.className;
            const aElem = li.querySelector('a');
            data.push({
              name: aElem.textContent,
              parent: className,
              cloneUrl: aElem.getAttribute('href'),
              children: [],
            });

            if (className.includes('parent')) {
              // this.getMenu()
              const _cn = className.replace(' ', '.');
              selector = `li.${_cn} > div > div > ul > li`;
              return getMenu(
                li.querySelectorAll(selector) as any,
                selector,
                data[data.length - 1].children,
              );
            }
          });

          return data;
        };

        return getMenu(elements, '.menu-block > ul > li', data);
      },
    );

    await browser.close();
    console.log('scrapingCategory done');

    return categories;
  }

  async scrapingLesson(scrapingUrl: string) {
    const browser = await this.launchBrowser();
    const page = await browser.newPage();
    const url = this.baseUrl + scrapingUrl;

    await page.goto(url);
    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36',
    );

    const lessons: any[] = await page.$$eval(
      '.category tr > td > a',
      (elements) => {
        return elements.map((e) => {
          return {
            cloneUrl: e.getAttribute('href'),
            name: e.textContent,
          };
        });
      },
    );

    await browser.close();
    console.log('scrapingLesson done');

    return lessons;
  }

  async scrapingGrammar(scrapingUrl: string) {
    const browser = await this.launchBrowser();
    const page = await browser.newPage();
    const url = this.baseUrl + scrapingUrl;

    await page.goto(url);
    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36',
    );

    let listScraping: any = [];
    listScraping = await this.scrapingForSelectorNguphap(page);
    await browser.close();
    console.log('scrapingGrammar done');

    return listScraping.filter((v) => v);
  }

  async scrapingVocabulary(scrapingUrl: string) {
    const browser = await this.launchBrowser();
    const page = await browser.newPage();
    const url = this.baseUrl + scrapingUrl;

    await page.goto(url);
    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36',
    );

    let vocabularies: any[] = [];

    vocabularies = await this.scrapingForSelectorTuvung(page);
    vocabularies = await this.scrapingForSelectorKhung2(page);

    await browser.close();
    console.log('scrapingVocabulary done');
    return vocabularies.filter((v) => v);
  }

  async scrapingForSelectorKhung2(page: Page) {
    if (!(await this.isSelectorExists(page, 'table.khung2'))) {
      return [];
    }

    return page.$$eval('table.khung2 > tbody > tr', (elements) => {
      return elements.map((element) => {
        const kanjiElem = element.cells.item(0);
        const vnSoundElem = element.cells.item(1);
        const vocabularyElem = element.cells.item(2);
        const meanElem = element.cells.item(3);

        return {
          vocabulary: vocabularyElem.textContent?.trim(),
          kanji: kanjiElem.textContent?.trim(),
          vietnam_sound: vnSoundElem.textContent?.trim(),
          mean: meanElem.textContent?.trim(),
        };
      });
    });
  }

  async isSelectorExists(page: Page, selector: string) {
    return page.$(selector);
  }

  async scrapingForSelectorNguphap(page: Page) {
    const selector = '#nguphap';
    if (!(await this.isSelectorExists(page, selector))) {
      return [];
    }

    const grammarUrl = await page.$eval(selector, (element) => {
      return element.getAttribute('href');
    });

    await page.goto(this.baseUrl + grammarUrl);

    return page.$$eval('div.tab_content#tab3 .slide', (elements) => {
      return elements.map((element) => {
        const grammarTitle = element.querySelector('.slide-title').textContent;
        const trElementContents = element.querySelectorAll(
          '.khung > tbody > tr',
        );

        const labels = [
          'Cấu trúc',
          'Ý nghĩa',
          'Giải thích & Hướng dẫn',
          'Ví dụ',
        ];

        let listMapping = [];
        trElementContents.forEach((trElem) => {
          const tdElems = trElem.querySelectorAll('td');

          let tdTextIndex = 1;
          if (trElem.childElementCount === 1) {
            tdTextIndex = 0;
          }

          const tdText = tdElems[tdTextIndex].textContent?.trim();

          if (labels.includes(tdText)) {
            listMapping.push({ title: tdText });
          } else {
            const lastIndex = listMapping.length - 1;
            if (listMapping[lastIndex].title === 'Ví dụ') {
              if (!listMapping[lastIndex]?.content?.length) {
                listMapping[lastIndex].content = [];
              }

              const wordRaw =
                trElem.querySelector('.tudich .candich').textContent;
              const wordTranslate = trElem.querySelector(
                '.tudich .kqdich .nddich',
              ).textContent;
              listMapping[lastIndex].content.push({
                wordRaw,
                wordTranslate,
              });
            } else {
              listMapping[lastIndex].content =
                trElem.querySelectorAll('td')[1].innerHTML;
            }
          }
        });

        const keyLabel = {
          ['Cấu trúc']: 'structure',
          ['Ý nghĩa']: 'mean',
          ['Giải thích & Hướng dẫn']: 'explain',
          ['Ví dụ']: 'examples',
        };
        listMapping = listMapping.reduce((newObj, listChild) => {
          newObj[keyLabel[listChild.title]] = listChild.content;
          return newObj;
        }, {});
        return listMapping;
      });
    });
  }

  async scrapingForSelectorTuvung(page: Page) {
    if (!(await this.isSelectorExists(page, '#tuvung'))) {
      return [];
    }

    const vocabularyUrl = await page.$eval('#tuvung', (element) => {
      return element.getAttribute('href');
    });

    await page.goto(this.baseUrl + vocabularyUrl);

    return page.$$eval('table.search_result > tbody > tr', (elements) => {
      return elements.map((element) => {
        if (element.childElementCount === 5) {
          const vocabularyElem = element.cells.item(0);
          const kanjiElem = element.cells.item(1);
          const vnSoundElem = element.cells.item(2);
          const mediaElem = element.cells.item(3);
          const meanElem = element.cells.item(4);

          return {
            vocabulary: vocabularyElem.textContent?.trim(),
            kanji: kanjiElem.textContent?.trim(),
            vietnam_sound: vnSoundElem.textContent?.trim(),
            mediaUrl: mediaElem.querySelector('audio').getAttribute('src'),
            mean: meanElem.textContent?.trim(),
          };
        } else if (element.childElementCount === 3) {
          const vocabularyElem = element.cells.item(0);
          const mediaElem = element.cells.item(1);
          const meanElem = element.cells.item(2);

          return {
            vocabulary: vocabularyElem.textContent?.trim(),
            mediaUrl: mediaElem.querySelector('audio').getAttribute('src'),
            mean: meanElem.textContent?.trim(),
          };
        } else {
          return null;
        }
      });
    });
  }
}

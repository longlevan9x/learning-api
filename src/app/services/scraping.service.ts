import { Injectable } from '@nestjs/common';
// import puppeteer from 'puppeteer';
// import puppeteer from 'puppeteer-core';
let chrome: any = {};
let puppeteer;

if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
  // running on the Vercel platform.
  chrome = require('chrome-aws-lambda');
  puppeteer = require('puppeteer-core');
  // import chrome from 'chrome-aws-lambda';
  // import puppeteer from 'puppeteer-core';
} else {
  // running locally.
  puppeteer = require('puppeteer');
}

@Injectable()
export class ScrapingService {
  baseUrl = 'https://www.vnjpclub.com/';

  async launchBrowser() {
    let options: any = {
      headless: false,
      ignoreHTTPSErrors: true,
    };

    if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
      options = {
        args: [...chrome?.args, '--hide-scrollbars', '--disable-web-security'],
        defaultViewport: chrome?.defaultViewport,
        executablePath: await chrome?.executablePath,
        headless: false,
        ignoreHTTPSErrors: true,
      };
    }
    return await puppeteer.launch(options);
  }

  async scrapingCategory() {
    const browser = await puppeteer.launch({ headless: false });
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
    const browser = await puppeteer.launch({ headless: false });
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

  async scrapingVocabulary(scrapingUrl) {
    // const browser = await puppeteer.launch({ headless: false });
    const browser = await this.launchBrowser();
    const page = await browser.newPage();
    const url = this.baseUrl + scrapingUrl;

    await page.goto(url);
    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36',
    );

    // const vocabularies = await this.scrapingMinnaBook(page);
    const vocabularies = await this.scrapingN2SoumatomeKanji(page);

    await browser.close();
    console.log('scrapingVocabulary done');

    return vocabularies.filter((v) => v);
  }

  async scrapingN2SoumatomeKanji(page) {
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

  async scrapingMinnaBook(page) {
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

import { Injectable } from '@nestjs/common';
import { CreateCloneDto } from './dto/create-clone.dto';
import { UpdateCloneDto } from './dto/update-clone.dto';
import puppeteer from 'puppeteer';

@Injectable()
export class CloneService {
  constructor() {}

  async clone() {
    // const res = await this.httpService.axiosRef.get(
    //   'https://www.vnjpclub.com/',
    // );
    // const $ = cheerio.load(res.data);
    // console.log($.html());

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://www.vnjpclub.com/');

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36',
    );

    const stockAvailable = await page.$eval(
      '.menu-block ul',
      (element: Element) => {
        const texts = [];
        element.querySelectorAll('li').forEach((li) => {
          texts.push(li.textContent);
        });
        return texts;
      },
    );

    console.log(stockAvailable);
    await browser.close();
  }

  create(createCloneDto: CreateCloneDto) {
    return 'This action adds a new clone';
  }

  findAll() {
    return `This action returns all clone`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clone`;
  }

  update(id: number, updateCloneDto: UpdateCloneDto) {
    return `This action updates a #${id} clone`;
  }

  remove(id: number) {
    return `This action removes a #${id} clone`;
  }
}

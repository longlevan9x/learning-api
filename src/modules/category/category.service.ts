import { Injectable } from '@nestjs/common';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from '../../app/repositories/category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import puppeteer from 'puppeteer';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepository.create(createCategoryDto);
  }

  findAll() {
    return this.categoryRepository.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryRepository.update(id, updateCategoryDto);
  }

  remove(id: string) {
    return this.categoryRepository.remove(id);
  }

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

    const textList: any = await page.$$eval(
      '.menu-block > ul > li',
      (element) => {
        const texts = [];

        element.forEach((li) => {
          // console.log(li.outerHTML)
          const className = li.className;
          texts.push({
            name: li.querySelector('a').textContent,
            parent: className,
            children: [],
          });

          if (className.includes('parent')) {
            const _cn = className.replace(' ', '.');
            const querySelector = `.menu-block > ul > li.${_cn} > div > div > ul > li`;
            li.querySelectorAll(querySelector).forEach((x) => {
              const className1 = x.className;
              texts[texts.length - 1].children.push({
                name: x.querySelector('a').textContent,
                parent: className1,
                children: [],
              });

              if (className1.includes('parent')) {
                const _cn1 = className.replace(' ', '.');
                const querySelector1 = `.menu-block > ul > li.${_cn} > div > div > ul > li.${_cn1} > div > div > ul > li`;
                li.querySelectorAll(querySelector1).forEach((xy) => {
                  const className12 = xy.className;
                  texts[texts.length - 1].children[
                    texts[texts.length - 1].children.length - 1
                  ].children.push({
                    name: xy.querySelector('a').textContent,
                    parent: className12,
                  });
                });
              }
            });
          }
        });
        return texts;
      },
    );

    await browser.close();
    await this.categoryRepository.removeAll();

    for (const textListElement of textList) {
      const category: any = {
        name: textListElement.name,
        parentId: '',
      };
      const cate = await this.categoryRepository.create(category);

      if (textListElement.children.length) {
        for (const textListElement1 of textListElement.children) {
          const category1: any = {
            name: textListElement1.name,
            parentId: cate._id,
          };

          const cate1 = await this.categoryRepository.create(category1);

          if (textListElement1.children.length) {
            for (const textListElement12 of textListElement1.children) {
              const category12: any = {
                name: textListElement12.name,
                parentId: cate1._id,
              };

              const cate12 = await this.categoryRepository.create(category12);
            }
          }
        }
      }
    }
    console.log('done');
  }
}

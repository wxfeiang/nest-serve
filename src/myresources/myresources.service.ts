import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import { http } from 'src/common/utils/https';
@Injectable()
export class MyresourcesService {
  private readonly baseUrl = 'https://www.cfddd.com';

  /**
   * @description: 获取图片列表
   * @return {}
   */
  async resoType() {
    const res: any = await http.request({
      url: this.baseUrl + '/Enter/home.html',
      method: 'get',
    });
    const arr = [];
    const $ = cheerio.load(res, { decodeEntities: false }); //
    $('.menu dl').each((idx, ele) => {
      const data = {
        idx,
        baseUrl: this.baseUrl,
        type: $(ele).find('dt a').attr('data-url'),
        name: $(ele).find('dt a').text(),
        typeList: [],
      };

      $(ele)
        .find('dd')
        .each((i, dd) => {
          const list = {
            name: $(dd).find('a').text(),
            type: $(dd).find('a').attr('href'),
          };
          data.typeList.push(list);
        });

      arr.push(data);
    });
    return arr;
  }

  /**
   * @description: 获取图片列表
   * @return {}
   */
  async resoList(page: number, type: string) {
    const res: any = await http.request(
      {
        url: this.baseUrl + `/${type}/index_${page}.html`,
        method: 'get',
      },
      // { all: true },
    );
    const arr = [];
    const $ = cheerio.load(res, { decodeEntities: false }); //
    $('.channel-list .row dl').each((idx, ele) => {
      const data = {
        baseUrl: this.baseUrl,
        desc: $(ele).find('dt a').attr('href'),
        imgurl: $(ele).find('dt a img').attr('data-original'),
      };

      arr.push(data);
    });
    return arr;
  }

  /**
   * @description: 获取图片详情
   * @param {} id // 路径
   * @return {}
   */
  async resoDesc(id: string) {
    const res: any = await http.request({
      url: this.baseUrl + id,
      method: 'get',
    });
    const arr = [];
    const $ = cheerio.load(res, { decodeEntities: false });
    const name = $('.main h1').text();
    $('.pic img').each((idx, ele) => {
      const data = {
        name,
        imgurl: $(ele).attr('src'),
      };
      arr.push(data);
    });
    return arr;
  }
}

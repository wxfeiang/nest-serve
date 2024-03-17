import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import { garbledCode } from 'src/common/utils';
import { http } from 'src/common/utils/https';
import { Myresource, MyresourceId } from './entities/myresource.entity';
import { changeType } from './utils';
@Injectable()
export class MyresourcesService {
  private readonly baseUrl = 'https://www.cfddd.com';
  private readonly tbbUrl = 'https://94.131.13.149:2828';
  private readonly ttbAccept =
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7';

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
  /**
   * @description: 获取网站类型
   * @return {}
   */
  async tbbType() {
    const res: any = await http.request({
      url: this.tbbUrl,
      method: 'get',
      headers: {
        Accept: this.ttbAccept,
      },
      responseType: 'arraybuffer', // 关键步骤
      responseEncoding: 'utf8',
    });
    const $ = garbledCode(res);
    const list = [];
    $('table')
      .eq(1)
      .find('tr')
      .each((idx, ele) => {
        const lastTd = $(ele).find('td a');
        lastTd.each((tdIndex, tdEl) => {
          const data = {
            type: $(ele).find('h4').text(),
            name: $(tdEl).text(),
            linkUrl: $(tdEl).attr('href') + ',' + $(ele).find('h4').text(),
          };
          list.push(data);
        });
      });
    return list;
  }
  /**
   * @description: 推荐导航
   * @return {}
   */
  async tbbRecommendedNavigation() {
    const res: any = await http.request({
      url: this.tbbUrl,
      method: 'get',
      headers: {
        Accept: this.ttbAccept,
      },
      responseType: 'arraybuffer', // 关键步骤
      responseEncoding: 'utf8',
    });
    const $ = garbledCode(res);
    const list = [];
    $('.zztj a').each((idx, ele) => {
      const data = {
        name: $(ele).text(),
        linkUrl: $(ele).attr('href'),
      };
      list.push(data);
    });
    return list;
  }
  /**
   * @description: 根据类型获取类容
   * @return {}
   */
  async tbbTypeContList(data: Myresource) {
    const { type, key } = changeType(data.type);
    // 类型自带了 /
    const res: any = await http.request({
      url: `${this.tbbUrl}${type}${data.size}.html`,
      method: 'get',
      headers: {
        Accept: this.ttbAccept,
      },
      responseType: 'arraybuffer', // 关键步骤
      responseEncoding: 'utf8',
    });
    // 根据key 处理不同的数据
    const $ = garbledCode(res);
    const name = $('table').eq(3).find('td').text().trim();
    const list = [];
    if (key == 'img' || key == 'html') {
      $('table')
        .eq(4)
        .find('tr')
        .each((idx, ele) => {
          const resData = {
            key,
            type: data.type,
            name: $(ele).find('td').eq(1).find('a').text(),
            linkUrl: $(ele).find('td').eq(1).find('a').attr('href'),
            date: $(ele).find('td').eq(0).text(),
          };
          list.push(resData);
        });
    } else {
      // video
      $('table')
        .eq(4)
        .find('tr a')
        .each((idx, ele) => {
          const resData = {
            key,
            type: data.type,
            name: $(ele).find('.tuzi').text(),
            linkUrl: $(ele).attr('href'),
            time: $(ele).find('.yuming').text(),
            bgUrl: $(ele).find('.lazy').attr('data-original'),
          };
          list.push(resData);
        });
    }
    return { name, list };
  }

  /**
   * @description: 根据ID获取详情
   * @return {}
   */
  async tbbTypeDesc(data: MyresourceId) {
    const { key } = changeType(data.type);

    // 类型自带了 /
    const res: any = await http.request({
      url: `${this.tbbUrl}${data.id}`,
      method: 'get',
      headers: {
        Accept: this.ttbAccept,
      },
      responseType: 'arraybuffer', // 关键步骤
      responseEncoding: 'utf8',
    });
    const $ = garbledCode(res);
    const list = [];
    let name = '';

    if (key === 'img') {
      name = $('table').eq(3).find('td h4').text().trim();
      $('table')
        .eq(3)
        .find('img')
        .each((idx, ele) => {
          const data = {
            imgUrl: $(ele).attr('src'),
          };
          list.push(data);
        });
    } else if (key === 'html') {
      name = $('table').eq(3).find('td h4 a').text().trim();
      const html = $('table').eq(3).find('td').last().html();
      list.push(html);
    } else if (key === 'video') {
      //TODO: 解析视频地址
      name = $('table').eq(3).find('td h4 font').last().text();
      const src = $('table').eq(3).find('tr').eq(1).find('td').html();
      list.push(src);
    }

    return { name, list };
  }
}
//  TODO: 检索不好区分类型

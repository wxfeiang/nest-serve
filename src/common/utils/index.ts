import * as cheerio from 'cheerio';
import { existsSync, mkdirSync } from 'fs';
import { Logger } from '../logger/log4js';
/**
 * @description: 处理 异常返回  日志打印
 * @param {} data
 * @return {}
 */
export function dyErrorResponse(data: any) {
  const logFormat = `-----------------error-------------------------
    error: ${JSON.stringify(data, null, 2)}
       \n------------------------------------------------ \n`;
  Logger.error(logFormat);
}

/**
 * 创建文件夹
 * @param filePath 文件路径
 */
export const checkDirAndCreate = (filePath: string) => {
  const pathArr = filePath.split('/');
  let checkPath = '.';
  for (let i = 0; i < pathArr.length; i++) {
    checkPath += `/${pathArr[i]}`;
    if (!existsSync(checkPath)) {
      mkdirSync(checkPath);
    }
  }
};

/**
 *
 * @param src 文件地址
 * @returns 获取文件后缀名
 */
export const getFileSuffix = (src: string) => {
  return src.substring(src.lastIndexOf('.'));
};

/**
 * 类赋值-合并
 * @param oldVal 旧值
 * @param newVal 新值
 */
export function classAssign<T extends object>(oldVal: T, newVal: T): T {
  for (const k in newVal) {
    oldVal[k] = newVal[k];
  }

  return oldVal;
}

/**
 *
 * @param data
 * @returns 列表转树结构
 */
export function listToTree<T extends { id: string; pId: string }>(data: T[]) {
  const obj = {};
  data.forEach((w) => (obj[w.id] = w));
  type TParent = T & { children?: T[] };
  const parentList: TParent[] = [];
  data.forEach((w) => {
    const parent: TParent = obj[w.pId];
    if (parent) {
      parent.children = parent.children || [];
      parent.children.push(w);
    } else {
      parentList.push(w);
    }
  });
  return parentList;
}

/**
 * @description: 解析返回的HTML 乱码
 * @param {} res
 * @return {}
 */
export function garbledCode(res: any) {
  const utf8decoder = new TextDecoder('GBK'); // 关键步骤
  const html = utf8decoder.decode(res);
  const $ = cheerio.load(html, { decodeEntities: false });
  return $;
}

/**
 * @description:  返回处理后的图片
 * @param {} imgs
 * @return {}
 */
export function resImgs(imgs: any) {
  const imgArr = [];
  imgs.each((idx) => {
    const src = imgs[idx].attr('src');
    imgArr.push(src);
  });
  return imgArr;
}

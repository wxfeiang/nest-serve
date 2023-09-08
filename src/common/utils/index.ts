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

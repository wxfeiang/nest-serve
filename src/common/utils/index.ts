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

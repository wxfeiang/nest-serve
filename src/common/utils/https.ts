/*
 * @Author: wxfeiang wxfeiang@qq.com
 * @Description:   请求方法 组件库自动导入了
 * @Date: 2023-08-28 09:06:24
 * @LastEditors: wxfeiang wxfeiang@qq.com
 * @LastEditTime: 2024-03-16 22:38:33
 * @FilePath: /nest-server/src/common/utils/https.ts
 * Copyright (c) 2023 by ${git_name} email: ${git_email}, All Rights Reserved.
 */

import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
interface IOptions {
  gbk?: boolean;
  message?: boolean;
  text?: boolean;
  all?: boolean;
}
export class Axios {
  private instance;
  private options: IOptions = {
    gbk: true,
    message: true,
    text: true,
    all: false,
  };
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);
    this.interceptors();
  }

  public async request<T>(config: AxiosRequestConfig, options?: IOptions) {
    this.options = Object.assign(this.options, options ?? {});
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.instance.request(config);
        resolve(this.options.all ? response : response.data);
      } catch (error) {
        reject(error);
      }
    }) as Promise<T>;
  }

  private interceptors() {
    this.interceptorsRequest();
    this.interceptorsResponse();
  }

  private interceptorsRequest() {
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        //   if (this.options.text) useErrorStore().resetError();
        config.headers.Accept = config.headers.Accept || 'application/json';
        //  config.headers.Authorization = `${storage.get(CacheEnum.TOKEN_NAME)}`;
        // FIX: 暂时去掉token 前缀 Bearer ，后端有返回
        return config;
      },
      (error: any) => {
        return Promise.reject(error);
      },
    );
  }
  private interceptorsResponse() {
    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }
}

const http = new Axios({
  baseURL: '',
  timeout: 10000,
});

export { http };

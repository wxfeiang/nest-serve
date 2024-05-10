import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Logger } from '../logger/log4js';

interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    // const req = context.getArgByIndex(1).req;

    const ctx = context.switchToHttp();
    const req = ctx.getRequest();

    const res = ctx.getResponse();
    const code = res.statusCode; //响应状态码

    return next.handle().pipe(
      map((data) => {
        if (req.method === 'POST') {

          if (res.statusCode === HttpStatus.CREATED) {
            res.status(HttpStatus.OK);
          }
        }

        const logFormat = `-----------------响应数据----------------------------

        Request original url: ${req.originalUrl}
        Method: ${req.method}
        IP: ${req.ip}
        User: ${JSON.stringify(req.user)}
        body: ${JSON.stringify(req.body)}
        query: ${JSON.stringify(req.query)}
        params: ${JSON.stringify(req.params)}
        Response data:\n ${JSON.stringify(data, null, 2)}
        \n------------------------------------------------`;
        //根据状态码，进行日志类型区分
        if (code >= 500) {
          Logger.error(logFormat);
        } else if (code >= 400) {
          Logger.warn(logFormat);
        } else {
          Logger.access(logFormat);
        }

        // 返回接口数据==
        return {
          data,
          code: 200,
          message: 'success',
          success: true,
        };
      }),
    );
  }
}

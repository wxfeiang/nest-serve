import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { dyErrorResponse } from '../utils';
import { CustomException, TBusinessError } from './custom.exception';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const request = host.switchToHttp().getRequest<Request>();
    const response = host.switchToHttp().getResponse<Response>();

    // 自定义异常走这个
    if (exception instanceof CustomException) {
      const { code, message } = exception.getResponse() as TBusinessError;
      const dyErrorData = {
        data: null,
        status: code,
        message,
        success: false,
      };
      dyErrorResponse(dyErrorData);
      response.status(HttpStatus.OK).send(dyErrorData);
    }
    // http异常
    const httErrorData = {
      statusCode: HttpStatus.NOT_FOUND,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.getResponse(),
    };

    dyErrorResponse(httErrorData);
    response.status(HttpStatus.NOT_FOUND).send({
      httErrorData,
    });
  }
}

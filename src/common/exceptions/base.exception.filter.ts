import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { dyErrorResponse } from '../utils';

@Catch()
export class BaseExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const request = host.switchToHttp().getRequest<Request>();
    const response = host.switchToHttp().getResponse<Response>();

    // 程序异常
    const errorData = {
      statusCode: HttpStatus.SERVICE_UNAVAILABLE,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    };
    dyErrorResponse(errorData);
    response.status(HttpStatus.SERVICE_UNAVAILABLE).send(errorData);
  }
}

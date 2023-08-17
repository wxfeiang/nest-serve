import { Controller, Get, Version } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { CustomException } from './common/exceptions/custom.exception';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Get('err')
  getErr() {
    throw new CustomException('这里是自定义异常抛出');
  }

  @Get()
  @Version('1')
  getHello1() {
    return this.configService.get('HTTP');
  }
}

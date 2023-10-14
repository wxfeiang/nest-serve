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

  //  案例
  // update(user: User) {
  //   return this.userRepositroy.update({ id: user.id }, user);
  // }

  // delete(id: User['id']) {
  //   return this.userRepositroy.delete({ id });
  // }
  // list() {
  //   // FIx: 查询使用 sql  其他都是用提供的方法
  //   const sql = `
  //   SELECT
  //     *
  //   FROM
  //     user
  // `;
  //   // return this.userRepositroy.find(); // 提供的简单方法
  //   return this.userRepositroy.query(sql); // sql
  // }
}

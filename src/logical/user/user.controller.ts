import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

//  @Controller('lesson-1') //当前路由可配置的前缀
@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post('find-one')
  findOne(@Body() body: any) {
    return this.usersService.findOne(body.username);
  }
  @Get('getone')
  getOne() {
    return this.usersService.getOne();
  }
}

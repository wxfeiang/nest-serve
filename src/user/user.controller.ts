import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import * as cheerio from 'cheerio';
import { isPublic } from 'src/auth/constants';
import { http } from 'src/common/utils/https';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('用户管理')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: '用户列表',
  })
  @Get()
  list() {
    return this.userService.list();
  }

  @ApiOperation({
    summary: '新增用户',
  })
  @Post()
  save(@Body() user: User) {
    return this.userService.save(user);
  }

  @ApiOperation({
    summary: '修改用户',
  })
  @Put()
  update(@Body() user: User) {
    return this.userService.update(user);
  }

  @ApiOperation({
    summary: '删除',
  })
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.userService.delete(id);
  }

  @ApiOperation({
    summary: '调用第三方接口测试',
  })
  @Get('outherHttp')
  @isPublic()
  async outherHttp() {
    const data: any = await http.request({
      url: 'https://jsonplaceholder.typicode.com',
      method: 'get',
    });
    const $ = cheerio.load(data);
    const a = $('#hero').text();
    return a;
  }
}

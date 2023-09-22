import { HttpService } from '@nestjs/axios';
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
import { AxiosResponse } from 'axios';
import { Observable, map } from 'rxjs';
import { isPublic } from 'src/auth/constants';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@ApiTags('用户管理')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly httpService: HttpService,
  ) {}

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
  outherHttp(): Observable<AxiosResponse> {
    return this.httpService
      .get('https://jsonplaceholder.typicode.com/posts')
      .pipe(map((res) => res.data));
  }
}

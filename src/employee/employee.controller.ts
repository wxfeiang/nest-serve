import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Post,
  Put,
  Query,
  Res,
  Session
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import * as md5 from 'md5';
import { isPublic } from 'src/auth/constants';
import { pageInfo } from 'src/common/decorators/pageInfo.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { CustomException } from 'src/common/exceptions/custom.exception';
import { AuthService } from '../auth/auth.service';
import { PageList, TIdAndUsername } from '../types/index';

import { LoginEmployeeDto, QueryEmployeeDto, assignRolesDto } from './dto/query-employee.dto';
import EmployeeService from './employee.service';
import { Employee } from './entities/employee.entity';

@ApiTags('员工模块')
@Controller('employee')
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly authService: AuthService,
  ) { }

  @ApiOperation({
    summary: '员工登陆',
    description: '登陆获取token,返回当前用户信息',
  })
  @isPublic()
  @Post('login')
  async login(@Session() session, @Body() employee: LoginEmployeeDto) {
    const { username, password, verifyCode } = employee;
    // 前端传回来的验证码，转换成小写
    const ncode = verifyCode.toLowerCase();
    //get方式获取的验证码定义的
    const sessionCode = String(session.code).toLowerCase();

    if (sessionCode !== ncode) {
      session.code = null;
      throw new CustomException(
        sessionCode ? '验证码错误' : '验证码过期，请重新获取',
      );
    }

    // 判断能否通过账号查询出用户信息
    const _employee = await this.employeeService.findByUsername(username);
    // 判断能否通过账号查询出用户信息
    if (!_employee) {
      // 查不到，返回用户名错误信息
      throw new CustomException('账号不存在，请重新输入');
    }

    // 判断员工是否被禁用
    if (_employee.status === 0) {
      throw new CustomException('当前员工已禁用');
    }

    // 能查到，对输入的密码进行 md5加密，对比密码， 可能有大小写
    if (md5(password) !== _employee.password) {
      // 不一致，返回密码错误信息
      throw new CustomException('密码不对，请重新输入');
    }
    // 密码一致，返回用户信息-需要剔除密码
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...rest } = _employee;
    const tokenObj = await this.authService.login(_employee);
    return { ...rest, ...tokenObj };
  }

  @ApiOperation({
    summary: '测试接口认证',
  })
  @Get('/test')
  // @ApiQuery({
  //   name: 'page',
  // })
  async test(@User() user: Pick<Employee, TIdAndUsername>) {
    return user;
  }

  @ApiOperation({
    summary: '查询员工列表',
  })
  @Post('/list')
  list(@Body() employee: QueryEmployeeDto, @pageInfo() pageInfo: PageList) {
    return this.employeeService.list({ ...employee, ...pageInfo });
  }

  @ApiOperation({
    summary: '创建员工',
  })
  @Post()
  create(@Body() employee: Employee) {
    employee.password = md5(employee.password); // 创建初始密码，并对其进行md5加密
    return this.employeeService.create(employee);
  }

  @ApiOperation({
    summary: '根据ID查询',
  })
  @Get('id/:id') // 直接写id 会优先匹配到这个路径/或者放到最后
  findOne(@Param('id') id: string) {
    return this.employeeService.findById(id);
  }

  @ApiOperation({
    summary: '更新',
  })
  @Put()
  update(@Body() employee: Employee) {
    return this.employeeService.update(employee);
  }

  @ApiOperation({
    summary: '删除,支持批量操作',
  })
  @Delete()
  del(@Query('ids') ids: string[]) {
    return this.employeeService.delete(ids);
  }

  @ApiOperation({
    summary: '启用，禁用,支持批量操作',
  })
  @Post('status/:status')
  setStatus(@Param('status') status: number, @Query('ids') ids: string[]) {
    return this.employeeService.setStatus(ids, status);
  }
  @ApiOperation({
    summary: '分派角色--',
  })
  @Post('assignRoles')
  assignRoles(@Body() assignRole: assignRolesDto) {
    return this.employeeService.assignRoles(assignRole);
  }

  @ApiOperation({
    summary: '获取用户信息(角色，组织机构）',
  })
  @Get('getUserInfo')
  getUserInfo(@Query('id') id: string) {
    return this.employeeService.getUserInfo(id);
  }

  @ApiOperation({
    summary: '导出用户信息表',
  })

  @Header('Content-Type', 'application/json')
  @Header('Content-Disposition', 'attachment; filename=' + encodeURIComponent('员工信息.xlsx') + '')
  @Post('exporeList')
  async exportXlsx(@Res({ passthrough: true }) res: Response, @Body() employee: Employee) {
    const file = await this.employeeService.exportEmployeeXlsx(employee);
    res.send(file);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import * as md5 from 'md5';
import { isPublic } from 'src/auth/constants';
import { User } from 'src/common/decorators/user.decorator';
import { CustomException } from 'src/common/exceptions/custom.exception';
import { exportExcel } from 'src/common/utils/fileExport';
import { AuthService } from '../auth/auth.service';
import { TIdAndUsername } from '../types/index';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import EmployeeService from './employee.service';
import { Employee } from './entities/employee.entity';

@ApiTags('员工模块')
@Controller('employee')
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({
    summary: '员工登陆',
    description: '登陆获取token',
  })
  @isPublic()
  @Post('login')
  async login(@Body() employee: CreateEmployeeDto) {
    const { username, password } = employee;
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

    // 能查到，对输入的密码进行 md5加密，对比密码，
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
  @Get('/list')
  page(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('name') name?: string,
  ) {
    return this.employeeService.page(page, pageSize, name);
  }

  @ApiOperation({
    summary: '创建员工',
  })
  @Post()
  create(@Body() employee: Employee) {
    employee.password = md5('123456'); // 创建初始密码，并对其进行md5加密
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
    summary: '导出',
  })
  @Get('exporeList')
  async exportXlsx(@Res() res: Response) {
    const allData = await this.employeeService.findAll();
    const buf = exportExcel(allData, '员工信息.xlsx');
    res.set(
      'Content-Disposition',
      'attachment; filename=' + encodeURIComponent('员工信息.xlsx') + '',
    );
    res.send(buf);
  }
}

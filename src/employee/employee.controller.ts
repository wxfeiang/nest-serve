import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import * as md5 from 'md5';
import { CustomException } from 'src/common/exceptions/custom.exception';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';
@ApiTags('员工模块')
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @ApiOperation({
    summary: '员工登陆',
  })
  @Post('login')
  async login(@Body() employee: Employee) {
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
      throw new CustomException('密码不对，请重新输入!');
    }
    // 密码一致，返回用户信息-需要剔除密码
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...rest } = _employee;
    return rest;
  }

  @Get('test')
  getErr() {
    return 1;
  }
}

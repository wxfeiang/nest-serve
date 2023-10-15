import { Injectable } from '@nestjs/common';

import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-local';

import { Employee } from '../../employee/entities/employee.entity';
import { AuthService } from '../auth.service';

import { CustomException } from 'src/common/exceptions/custom.exception';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }
  /**
   * 本地身份验证
   * @param username 用户名
   * @param password 密码
   */
  async validate(
    username: Employee['username'],
    password: Employee['password'],
  ) {
    const employee = await this.authService.validateEmployee(
      username,
      password,
    );
    // 验证不通过，通过自定义异常类返回权限异常信息
    console.log('🍺[employee]:', employee);
    if (!employee) {
      throw CustomException.throwForbidden();
    }
    return employee;
  }
}

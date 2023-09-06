import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmployeeService } from '../employee/employee.service';
import { Employee } from '../employee/entities/employee.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly jwtService: JwtService,
  ) {}
  /**
   *
   * @param username 用户名
   * @param pass 密码
   * @returns 验证用户
   */
  async validateEmployee(
    username: Employee['username'],
    pass: Employee['password'],
  ) {
    const employee = await this.employeeService.findByUsername(username);
    if (employee?.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = employee;
      return rest;
    }
    return null;
  }

  async login(employee: Employee) {
    const payload = { username: employee.username, id: employee.id };
    // 使用JWT生成token
    return {
      token: this.jwtService.sign(payload),
    };
  }
}

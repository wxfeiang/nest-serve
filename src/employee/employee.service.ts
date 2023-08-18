import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {
  // 注入
  @InjectRepository(Employee)
  private readonly employeeRepository: Repository<Employee>;

  /**
   * @description:根据账户名查找用户信息
   * @param {} username
   * @return {}
   */
  findByUsername(username: Employee['username']) {
    return this.employeeRepository.findOneBy({ username });
  }
}

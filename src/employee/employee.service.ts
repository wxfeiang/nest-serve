import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { BasePage } from 'src/common/database/pageInfo';
import { Like, Repository } from 'typeorm';
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

  /**
   *
   * @param page 页数
   * @param pageSize 每页多少条
   * @param name 用户名
   * @returns 分页
   */
  async page(page: number, pageSize: number, name = '') {
    const [employeeList, total] = await this.employeeRepository.findAndCount({
      where: {
        name: Like(`%${name}%`),
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return new BasePage(page, pageSize, total, employeeList);
  }
}

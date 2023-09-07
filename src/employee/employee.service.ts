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
    const sql = `
        SELECT
          * 
        FROM
          Employee 
        WHERE
          NAME LIKE "%${name}%" LIMIT  ${(page - 1) * pageSize},${pageSize};

       `;
    const sql2 = `
      SELECT
         COUNT(*) as total
      FROM
        Employee

    `;

    const [employeeList, total] = await this.employeeRepository.findAndCount({
      where: {
        name: Like(`%${name}%`),
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    // const employeeList = await this.employeeRepository.query(sql);
    // const [total] = await this.employeeRepository.query(sql2);
    console.log('🍝[total]:', total);
    return new BasePage(page, pageSize, total, employeeList);
  }
}

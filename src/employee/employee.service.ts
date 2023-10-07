import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { BasePage } from 'src/common/database/pageInfo';
import { CustomException } from 'src/common/exceptions/custom.exception';
import { In, Like, Repository } from 'typeorm';
import { classAssign } from '../common/utils/index';
import { Employee } from './entities/employee.entity';

@Injectable()
export default class EmployeeService {
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
      relations: ['organization', 'role'],
      where: {
        name: Like(`%${name}%`),
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return new BasePage(page, pageSize, total, employeeList);
  }

  /**
   *
   * @param employee Employee
   * @returns 创建员工
   */
  create(employee: Employee) {
    return this.employeeRepository.save(classAssign(new Employee(), employee));
  }
  /**
   *
   * @param id id
   * @returns 根据ID查询
   */
  async findById(id: string) {
    const employee = await this.employeeRepository.findOneBy({ id });
    if (!employee) {
      throw new CustomException('id不存在');
    }
    return employee;
  }

  /**
   *
   * @param employee
   * @returns 更新
   */
  async update(employee: Employee) {
    return !!(
      await this.employeeRepository.update(
        { id: employee.id },
        classAssign(new Employee(), employee),
      )
    ).affected;
  }

  /**
   *
   * @param ids ids
   * @returns 删除
   */
  async delete(ids: string[]) {
    // 只能删除停用的账号
    // 启用中的账号是不能删除的，可以通过count进行查询
    // In等同sql中的 IN 关键字,
    const count = await this.employeeRepository.countBy({
      id: In(ids),
      status: 1,
    });
    if (count > 0) {
      throw new CustomException('不能删除启用中的账号');
    }
    return !!(await this.employeeRepository.delete({ id: In(ids) })).affected;
  }

  /**
   *
   * @param ids ids
   * @returns 设置员工状态  启用 - 禁用
   */
  async setStatus(ids: string[], status: number) {
    const employee = new Employee();
    employee.status = status;
    return !!(await this.employeeRepository.update({ id: In(ids) }, employee))
      .affected;
  }

  /**
   *
   * @returns 查询所有数据
   */
  findAll() {
    return this.employeeRepository.find();
  }
}

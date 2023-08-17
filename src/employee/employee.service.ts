import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {
  // 注入
  @InjectRepository(Employee)
  private readonly employeeRepository: Repository<Employee>;
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from 'src/organization/entities/organization.entity';
import { Role } from 'src/role/entities/role.entity';
import { EmpRole } from '../role/entities/empRole.entity';
import { RoleModule } from '../role/role.module';
import { EmployeeController } from './employee.controller';
import EmployeeService from './employee.service';
import { Employee } from './entities/employee.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee, Organization, EmpRole, Role]),
    RoleModule,
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports: [EmployeeService],
})
export class EmployeeModule {}

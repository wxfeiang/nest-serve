import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/database/baseEntity';
import { Employee } from '../../employee/entities/employee.entity';
@Entity()
export class EmpRole extends BaseEntity {
  @ApiProperty({
    description: '角色名称',
  })
  @Column({
    comment: '角色名称',
  })
  name: string;

  @ApiProperty({
    description: '员工ID',
  })
  @Column({
    comment: '员工ID',
  })
  eId: string;

  @ApiProperty({
    description: '状态 0:禁用，1:正常',
  })
  @Column({
    comment: '状态 0:禁用，1:正常',
  })
  status: number;

  @ManyToOne(() => Employee, (employee) => employee.role)
  //  是要创建与外表连接的键的： name的话是本表的外键userId名， id的话是主表的主键名
  @JoinColumn({ name: 'e_id', referencedColumnName: 'id' })
  employee: Employee;
}

import { ApiProperty } from '@nestjs/swagger';
import { Employee } from 'src/employee/entities/employee.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/database/baseEntity';

@Entity({
  orderBy: {
    updateTime: 'DESC',
  },
})
export class Organization extends BaseEntity {
  @ApiProperty({
    description: '组织架构名',
  })
  @Column({
    comment: '组织架构名',
  })
  name: string;

  @ApiProperty({
    description: '组织架构顺序',
  })
  @Column({
    comment: '组织架构顺序',
  })
  sort?: number;

  @ApiProperty({
    description: '部门ID',
  })
  @Column({
    comment: '部门ID',
  })
  dId: string;

  @ApiProperty({
    description: '员工ID',
  })
  @Column({
    comment: '员工ID',
  })
  eId: string;

  @ApiProperty({
    description: '父级ID',
  })
  @Column({
    comment: '父级ID',
  })
  pId: string;

  @ManyToOne(() => Employee, (employee) => employee.organization)
  // .  是要创建与外表连接的键的： name的话是本表的外键userId名， id的话是主表的主键名
  @JoinColumn({ name: 'e_id', referencedColumnName: 'id' })
  employee: Employee;
}

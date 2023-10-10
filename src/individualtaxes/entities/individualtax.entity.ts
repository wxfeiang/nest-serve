import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/database/baseEntity';

@Entity()
export class IndividualTaxes extends BaseEntity {
  @ApiProperty({
    description: '字典名称',
  })
  @Column({
    comment: '名称',
    unique: true,
  })
  name: string;

  @ApiProperty({
    description: '类型',
  })
  @Column({
    comment: '类型',
    unique: true,
  })
  type: number;

  @ApiProperty({
    description: '公司',
  })
  @Column({
    comment: '公司',
  })
  company: string;

  @ApiProperty({
    description: '扣除',
  })
  @Column({
    comment: '扣除',
  })
  deduct: number;

  @ApiProperty({
    description: '收入',
  })
  @Column({
    comment: '收入',
  })
  revenue: number;

  @ApiProperty({
    description: '时间',
  })
  @Column({
    comment: '时间',
  })
  date: string;

  @ApiProperty({
    description: '用户ID',
  })
  @Column({
    comment: '用户ID',
  })
  eId: string;
}

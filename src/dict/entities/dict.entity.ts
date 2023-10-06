import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/database/baseEntity';

@Entity()
export class Dict extends BaseEntity {
  @ApiProperty({
    description: '字典名称',
  })
  @Column({
    comment: '字典名称',
    unique: true,
  })
  name: string;

  @ApiProperty({
    description: '字典类型',
  })
  @Column({
    comment: '字典类型',
    unique: true,
  })
  dictType: string;

  @ApiProperty({
    description: '字典描述',
  })
  @Column({
    comment: '字典描述',
    unique: true,
  })
  describe: string;

  @ApiProperty({
    description: '字典状态',
  })
  @Column({
    comment: '状态 0:禁用，1:正常',
  })
  status: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/database/baseEntity';

@Entity()
export class DictType extends BaseEntity {
  @ApiProperty({
    description: '字典标签',
  })
  @Column({
    comment: '字典标签',
    unique: true,
  })
  name: string;

  @ApiProperty({
    description: '字典键值',
  })
  @Column({
    comment: '字典键值',
    unique: true,
  })
  value: number;

  @ApiProperty({
    description: '字典排序',
  })
  @Column({
    comment: '字典排序',
  })
  sort: number;

  @ApiProperty({
    description: '字典状态',
  })
  @ApiProperty({
    description: '状态 0:禁用，1:正常',
  })
  @Column({
    comment: '状态 0:禁用，1:正常',
  })
  status: number;

  @ApiProperty({
    description: '样式属性',
  })
  @Column({
    comment: '样式属性',
  })
  cssClass: string;

  @ApiProperty({
    description: '回显样式',
  })
  @Column({
    comment: '回显样式',
  })
  listClass: string;

  @ApiProperty({
    description: '字典描述，备注',
  })
  @Column({
    comment: '标签描述',
  })
  describe: string;

  @ApiProperty({
    description: '父ID',
  })
  @Column({
    comment: '父级ID',
  })
  dId: string;

  @ApiProperty({
    description: '父级名称',
  })
  @Column({
    comment: '父级名称',
  })
  dName: string;
}

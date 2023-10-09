import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/database/baseEntity';
@Entity()
export class Menu extends BaseEntity {
  @ApiProperty({
    description: '菜单名称',
    required: true,
  })
  @Column({
    comment: '菜单名称',
    unique: true,
  })
  name: string;

  @Column({
    comment: '菜单类型',
    unique: true,
    enum: '[目录 0,菜单1,按钮 2]',
  })
  type: number;

  @ApiProperty({
    description: '状态 0:禁用，1:正常',
  })
  @Column({
    comment: '状态 0:禁用，1:正常',
  })
  status: number;

  @ApiProperty({
    description: '是否外链 0:是，1:否',
  })
  @Column({
    comment: '是否外链 0:是，1:否',
  })
  isLink: number;

  @ApiProperty({
    description: '是否缓存 0:是，1:否',
  })
  @Column({
    comment: '是否外链 0:是，1:否',
  })
  isCache: number;

  @ApiProperty({
    description: '路由地址',
  })
  @Column({
    comment: '路由地址',
  })
  routerUrl: string;

  @ApiProperty({
    description: '路由参数',
  })
  @Column({
    comment: '路由参数',
  })
  routerParams: string;

  @ApiProperty({
    description: '组件地址',
  })
  @Column({
    comment: '组件地址',
  })
  compoentsUrl: string;

  @ApiProperty({
    description: '权限字符',
  })
  @Column({
    comment: '权限字符',
  })
  authStr: string;

  @ApiProperty({
    description: '排序',
  })
  @Column({
    comment: '排序',
  })
  sort: number;

  @ApiProperty({
    description: '图标',
  })
  @Column({
    comment: '图标',
  })
  icon: string;

  @ApiProperty({
    description: '是否显示',
  })
  @Column({
    comment: '是否显示',
  })
  show: number;

  @ApiProperty({
    description: '父ID',
  })
  @Column({
    comment: '父ID',
  })
  pId: string;
}

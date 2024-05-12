import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/database/baseEntity';
@Entity()
export class Menu extends BaseEntity {
  @ApiProperty({
    description: '路由路径',
    required: true,
  })
  @Column({
    comment: '路由路径',
  })
  path: string;
  @ApiProperty({
    required: true,
    description:
      '路由名称（必须唯一并且和当前路由component字段对应的页面里用defineOptions包起来的name保持一致',
  })
  @Column({
    comment: '路由名称',
  })
  name: string;

  @ApiProperty({
    description: '路由参数',
  })
  @Column({
    comment: '路由参数',
  })
  routerParams: string;

  @ApiProperty({
    description: '组件地址,按需加载需要展示的页面',
  })
  @Column({
    comment: '组件地址',
  })
  component: string;
  @ApiProperty({
    description: '路由重定向',
  })
  @Column({
    comment: '路由重定向',
  })
  redirect: string;

  @ApiProperty({
    description: '菜单名称',
    required: true,
  })
  @Column({
    comment: '菜单名称',
    unique: true,
  })
  title: string;

  @ApiProperty({
    description: '图标',
  })
  @Column({
    comment: '菜单类型',
    unique: true,
    enum: '[目录 0,菜单1,按钮2]',
  })
  menuType: number;

  @ApiProperty({
    description: '图标',
  })
  @Column({
    comment: '图标',
  })
  icon: string;

  @ApiProperty({
    description: '菜单名称右侧的额外图标',
  })
  @Column({
    comment: '菜单名称右侧的额外图标',
  })
  extraIcon: string;

  @ApiProperty({
    description: '状态',
    example: 1,
  })
  @Column({
    comment: '状态 0:禁用，1:正常',
  })
  status: number;

  @ApiProperty({
    description: '是否显示',
    example: true,
  })
  @Column({
    comment: '是否显示',
  })
  showLink: boolean;

  @ApiProperty({
    description: '是否显示父级菜单',
  })
  @Column({
    comment: '是否显示父级菜单',
  })
  showParent: boolean;

  @ApiProperty({
    description: '菜单排序，值越高排的越后（只针对顶级路由）',
  })
  @Column({
    comment: '排序',
  })
  rank: number;

  @ApiProperty({
    description: '是否缓存 0:是,1:否',
  })
  @Column({
    comment: '是否缓存 0:是,1:否',
  })
  keepAlive: boolean;

  @ApiProperty({
    description: '前菜单名称或自定义信息禁止添加到标签页',
  })
  @Column({
    comment: '前菜单名称或自定义信息禁止添加到标签页',
  })
  hiddenTag: boolean;

  @ApiProperty({
    description:
      '显示在标签页的最大数量，需满足后面的条件：不显示在菜单中的路由并且是通过query或params传参模式打开的页面。在完整版全局搜dynamicLevel即可查看代码演示',
  })
  @Column({
    comment: 'dynamicLevel',
  })
  dynamicLevel: number;


  @ApiProperty({
    description: '进场动画',
  })
  @Column({
    comment: '进场动画',
  })
  enterTransition: string

  @ApiProperty({
    description: '离场动画',
  })
  @Column({
    comment: '离场动画',
  })
  leaveTransition: string

  @ApiProperty({
    description: '是否固定标签页',
  })
  @Column({
    comment: '是否固定标签页',
  })
  fixedTag: string

  @ApiProperty({
    description:
      ' 将某个菜单激活（主要用于通过query或params传参的路由，当它们通过配置showLink: false后不在菜单中显示，就不会有任何菜单高亮，而通过设置activePath指定激活菜单即可获得高亮，activePath为指定激活菜单的path）',
  })
  @Column({
    comment: '前菜单名称或自定义信息禁止添加到标签页',
  })
  activePath: string;

  @ApiProperty({
    description: '需要内嵌的iframe链接地址',
  })
  @Column({
    comment: '是否外链',
  })
  frameSrc: string;

  @ApiProperty({
    description: '内嵌的iframe页面是否开启首次加载动画',
  })
  @Column({
    comment: '是否外链',
  })
  frameLoading: boolean;

  @ApiProperty({
    description: '权限字符',
  })
  @Column({
    comment: '权限字符',
  })
  auths: string;

  @ApiProperty({
    description: '父ID',
  })
  @Column({
    comment: '父ID',
  })
  pId: string;

  // @ManyToMany(() => RoleMenu)
  // @JoinTable()
  // roleMeum: RoleMenu[];
}

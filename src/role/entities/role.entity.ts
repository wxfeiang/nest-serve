import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/database/baseEntity';
import { RoleMenu } from './roleMenu.entity';

@Entity()
export class Role extends BaseEntity {
  @ApiProperty({
    description: '角色名称',
    required: true,
    example: '角色',
  })
  @Column({
    comment: '角色名称',
    unique: true,
  })
  name: string;


  @Column({
    comment: '角色标识',
    unique: true,
  })
  code: string;


  @Column({
    comment: '角色描述',
  })
  describe: string;
  @ApiProperty({
    description: '状态 0:禁用，1:正常',
  })
  @Column({
    comment: '状态 0:禁用，1:正常',
    default: 1
  })
  status: number;

  @OneToMany(() => RoleMenu, (roleMenu) => roleMenu.role)
  roleMenu: RoleMenu[];
}

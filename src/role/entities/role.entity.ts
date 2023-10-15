import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/database/baseEntity';
import { RoleMenu } from './roleMenu.entity';

@Entity()
export class Role extends BaseEntity {
  @ApiProperty({
    description: '角色名称',
    required: true,
    example: '管理员',
  })
  @Column({
    comment: '角色名称',
    unique: true,
  })
  name: string;

  @Column({
    comment: '角色描述',
    unique: true,
  })
  describe: string;

  @ApiProperty({
    description: '状态 0:禁用，1:正常',
  })
  @Column({
    comment: '状态 0:禁用，1:正常',
  })
  status: number;

  @OneToMany(() => RoleMenu, (roleMenu) => roleMenu.role)
  roleMenu: RoleMenu[];
}

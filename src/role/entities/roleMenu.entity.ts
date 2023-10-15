import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/database/baseEntity';
import { Role } from './role.entity';
@Entity()
export class RoleMenu extends BaseEntity {
  @ApiProperty({
    description: '角色ID',
  })
  @Column({
    comment: '角色 ID',
    select: false,
  })
  rId: string;
  @ApiProperty({
    description: '菜单ID',
  })
  @Column({
    comment: '菜单ID',
  })
  mId: string;

  @ManyToOne(() => Role, (role) => role.roleMenu)
  //  是要创建与外表连接的键的： name的话是本表的外键userId名， id的话是主表的主键名
  @JoinColumn({ name: 'r_id', referencedColumnName: 'id' })
  role: Role;

  // @ManyToMany(() => Menu)
  // @JoinTable()
  // meum: Menu[];
}

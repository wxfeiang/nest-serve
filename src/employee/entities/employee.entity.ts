import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/database/baseEntity';
import { Column, Entity } from 'typeorm';
@Entity()
export class Employee extends BaseEntity {
  @ApiProperty({
    description: '用户姓名',
    required: true,
    example: 'admin',
  })
  @Column({
    comment: '用户姓名',
    unique: true,
  })
  name: string;

  @ApiProperty({
    description: '用户生日',
  })
  @Column({
    comment: '用户生日',
  })
  birthday: Date;

  @ApiProperty({
    description: '用户性别 0 男 1 女',
  })
  @Column({
    comment: '用户性别 0 男 1 女',
  })
  gender: number;

  @ApiProperty({
    description: '身份证号码',
  })
  @Column({
    comment: '身份证号码',
    unique: true,
  })
  idNumber: string;

  @ApiProperty({
    description: '手机号',
  })
  @Column({
    comment: '手机号',
  })
  phone: string;

  @ApiProperty({
    description: '账户名称-登陆时的账号',
  })
  @Column({
    comment: '账户名称-登陆时的账号',
  })
  username: string;

  @ApiProperty({
    description: '账户密码',
    example: '123456',
    required: true,
  })
  @Column({
    comment: '账户密码',
  })
  password: string;

  @ApiProperty({
    description: '状态 0:禁用，1:正常',
  })
  @Column({
    comment: '状态 0:禁用，1:正常',
  })
  status: number;

  @ApiProperty({
    description: '头像',
  })
  @Column({
    comment: '头像',
  })
  avatar: string;
}

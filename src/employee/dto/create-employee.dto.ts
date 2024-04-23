import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

//NOTE:   后期所有的接口要完善 入参数校验
export class CreateEmployeeDto {
  @ApiProperty({
    description: '账户名称-登陆时的账号',
    example: 'admin',
    required: true,
  })
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;

  @ApiProperty({
    description: '账户名称-登陆时的密码',
    example: '123456',
  })
  @IsNotEmpty({ message: '密码不能为空' })
  //  @IsOptional()  // 仅在它是请求正文的一部分时才进行验证
  password: string;

  @ApiProperty({
    description: '图形验证码',
    example: '',
  })
  @IsNotEmpty({ message: '图形验证码不能为空' })
  //  @IsOptional()  // 仅在它是请求正文的一部分时才进行验证
  verifyCode: string;
}
export class assignRolesDto {
  @ApiProperty({
    description: '分派员工ID',
    required: true,
  })
  @IsNotEmpty({ message: '员工ID并不能为空！' })
  id: string;

  @ApiProperty({
    description: '角色组 ID ',
  })
  @IsArray({ message: 'ID组 ==不能为空' })
  roles: assignRolesDto['id'][];
}

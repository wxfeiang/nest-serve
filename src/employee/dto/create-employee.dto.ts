import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Employee } from '../entities/employee.entity';

//NOTE:   后期所有的接口要完善 入参数校验

export class CreateEmployeeDto extends Employee {
  @ApiProperty({
    description: '账户名称-登陆时的账号',
    example: 'admin',
    required: true,
  })
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;

  @ApiProperty({
    description: '账户名称-登陆时的密码',
    example: '123456admin'
  })
  @IsNotEmpty({ message: '密码不能为空' })
  //  @IsOptional()  // 仅在它是请求正文的一部分时才进行验证
  password: string;

  @ApiProperty({
    description: '图形验证码',
    example: '',
  })
  @IsNotEmpty({ message: '图形验证码不能为空' })
  verifyCode: string;
}


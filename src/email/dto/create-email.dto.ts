import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateEmailDto {
  @ApiProperty({
    description: '接收邮件号',
    example: '1941926932@qq.com',
    required: true,
  })
  @IsNotEmpty({ message: '邮箱不能为空' })
  email: string;
}

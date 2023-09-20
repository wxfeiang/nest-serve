import { IsNotEmpty } from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  sername: string;
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Menu } from '../entities/menu.entity';

export class CreateMenuDto extends Menu {
  @ApiProperty({
    description: '菜单名称',
    example: 'admin',
    required: true,
  })
  @IsNotEmpty({ message: '菜单名称' })
  name: string;

  @ApiProperty({
    description: '类型',
  })
  @IsNotEmpty({ message: '类型不能唯恐' })
  //  @IsOptional()  // 仅在它是请求正文的一部分时才进行验证
  type: number;
}

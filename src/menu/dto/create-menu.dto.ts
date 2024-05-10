import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Menu } from '../entities/menu.entity';

export class CreateMenuDto extends Menu {
  @ApiProperty({
    description: '路由地址',
    example: '/path/to/page',
    required: true,
  })
  @IsNotEmpty({ message: '路由地址' })
  path: string;

  @ApiProperty({
    description: '类型',
  })
  @IsNotEmpty({ message: '类型不能为空！' })
  menuType: number;
}

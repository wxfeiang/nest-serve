import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Dict } from '../entities/dict.entity';

export class CreateDictDto extends Dict {
  @ApiProperty({
    description: '字典名称',
    example: '',
    required: true,
  })
  @IsNotEmpty({ message: '字典名称不能为空' })
  name: string;

  @ApiProperty({
    description: '字典类型',
    example: '_type',
  })
  @IsNotEmpty({ message: '字典类型不能为空' })
  //  @IsOptional()  // 仅在它是请求正文的一部分时才进行验证
  dictType: string;
}

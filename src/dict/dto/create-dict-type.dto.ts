import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { DictType } from '../entities/dictType.entity';

export class CreateDicTypeDto extends DictType {
  @ApiProperty({
    description: '字典标签',
    example: '',
    required: true,
  })
  @IsNotEmpty({ message: '字典标签不能为空' })
  name: string;

  @ApiProperty({
    description: '字典值',
  })
  @IsNotEmpty({ message: '字典值不能为空' })
  value: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class Myresource {
  @ApiProperty({
    description: '类型名称',
    example: '/zipaitoupai/',
  })
  @Column({
    comment: '类型名称',
  })
  type: string;

  @ApiProperty({
    description: '分页size',
    example: 1,
  })
  @Column({
    comment: '分页',
  })
  size: number;
}
export class MyresourceId {
  @ApiProperty({
    description: '类型名称',
    example: '/zipaitoupai/',
  })
  @Column({
    comment: '类型名称',
  })
  type: string;

  @ApiProperty({
    description: 'id',
  })
  @Column({
    comment: 'id',
  })
  id: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BaseEntity } from 'src/common/database/baseEntity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Serveresource extends BaseEntity {
  @ApiProperty({
    description: '资源名称',
    required: true,
  })
  @Column({
    comment: '资源名称',
  })
  @IsNotEmpty({ message: '资源名称不能为空' })
  name: string;

  @ApiProperty({
    description: '类型',
  })
  @Column({
    comment: '资源类型',
    //enum: "['0:图片, 1:视频, 2:音频,3:文档,4:其他']",
  })
  @IsNotEmpty({ message: '资源类型不能为空' })
  type: number;

  @ApiProperty({
    description: '备注',
    example: '这份资源用于干什么的',
  })
  @Column({
    comment: '资源备注',
  })
  @IsNotEmpty({ message: '资源备注不能为空' })
  remark: string;

  @ApiProperty({
    description: '资源地址',
    example: '服务器返回文件地址',
  })
  @Column({
    comment: '资源地址',
  })
  @IsNotEmpty({ message: '资源地址不能为空' })
  url: string;
}

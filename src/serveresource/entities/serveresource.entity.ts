import { ApiProperty } from '@nestjs/swagger';
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
  name: string;

  @ApiProperty({
    description: '类型',
  })
  @Column({
    comment: '资源类型',
    type: 'enum',
    enum: ['0:图片', '1:视频', '2:音频', '3:文档', '4:其他'],
  })
  type: number;

  @ApiProperty({
    description: '备注',
    example: '这份资源用于干什么的',
  })
  @Column({
    comment: '资源备注',
  })
  remark: string;

  @ApiProperty({
    description: '资源地址',
    example: '服务器返回文件地址',
  })
  @Column({
    comment: '资源内容',
  })
  url: string;
}

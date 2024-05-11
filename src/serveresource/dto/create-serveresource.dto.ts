import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateServeresourceDto {
    @ApiProperty({
        description: '资源名称',
        required: true,
    })
    @IsNotEmpty({ message: '资源名称不能为空' })
    name: string;

    @ApiProperty({
        description: '类型',
        example: 1,
        enum: ['0:图片', '1:视频', '2:音频', '3:文档', '4:其他'],

    })
    @IsNotEmpty({ message: '资源类型不能为空' })
    type: number;

    @ApiProperty({
        description: '备注',
        example: '这份资源用于干什么的',
    })
    @IsNotEmpty({ message: '资源备注不能为空' })
    remark: string;

    @ApiProperty({
        description: '资源地址',
        example: '服务器返回文件',
    })
    @IsNotEmpty({ message: '资源地址不能为空' })
    url: string;
}

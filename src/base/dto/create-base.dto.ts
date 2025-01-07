import { ApiProperty } from '@nestjs/swagger';

export class CaptchaImageDto {
  @ApiProperty({
    description: '图形验证码',
    example: '',
  })
  width: string;

  @ApiProperty({
    description: '验证码长度',
    example: '',
  })
  size: number;

  @ApiProperty({
    description: '字体大小',
    example: '',
  })
  fontSize: number;

  @ApiProperty({

    description: '背景颜色',
    example: '',
  })
  background: string;

  @ApiProperty({

    description: '验证码高度',
    example: '',
  })
  height: number;






}


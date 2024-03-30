import {
  Controller,
  Headers,
  Post,
  Session,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { isPublic } from 'src/auth/constants';
import { getConfig } from 'src/common/utils/ymlConfig';
import * as svgCaptcha from 'svg-captcha';

@ApiTags('公共模块')
@Controller('base')
export class BaseController {
  @ApiOperation({
    summary: '获取图形验证码',
  })
  @isPublic()
  @Post('/captchaImage')
  captchaImage(@Session() session) {
    const captcha = svgCaptcha.create({
      size: 4, //验证码长度
      fontSize: 50,
      width: 120,
      height: 30,
      background: '#f5f5f5', //背景颜色
    });

    session.code = captcha.text; //session保存验证码
    return { img: captcha.data, text: captcha.text }; // aptcha.data  返回的是svg图
  }

  @ApiOperation({
    summary: '上传本地',
  })
  @isPublic()
  @Post('/uploadLocal')
  @UseInterceptors(FileInterceptor('file'))
  uploadLocal(
    @UploadedFile() file: Express.Multer.File,
    @Headers('host') host: string,
  ) {
    // 如果是 localhost 就加上http://
    if (!host.includes('://')) {
      host = `http://${host}/v${getConfig('VERSION').index}/`;
    }
    const data = {
      url: file.path,
      base: host,
    };
    return data;
  }
}

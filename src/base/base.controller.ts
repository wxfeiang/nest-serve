import {
  Controller,
  Headers,
  Post,
  Res,
  Session,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { isPublic } from 'src/auth/constants';

import { BaseService } from './base.service';

@ApiTags('公共模块')
@Controller('base')
export class BaseController {
  constructor(private readonly baseService: BaseService) { }

  @ApiOperation({
    summary: '获取图形验证码',
  })
  @isPublic()
  @Post('/captchaImage')
  captchaImage(@Session() session, @Res() res) {
    return this.baseService.captchaImage(session, res);
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
    return this.baseService.uploadLocal(file, host);
  }
}

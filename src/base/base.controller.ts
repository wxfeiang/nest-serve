import {
  Controller,
  Headers,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { isPublic } from 'src/auth/constants';

@ApiTags('公共模块')
@Controller('base')
export class BaseController {
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
      host = `http://${host}`;
    }
    return `${host}/${file.path}`;
  }
}

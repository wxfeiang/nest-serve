import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MyresourcesService } from './myresources.service';

@ApiTags('我的资源')
@Controller('myresources')
export class MyresourcesController {
  constructor(private readonly myresourcesService: MyresourcesService) {}

  @ApiOperation({
    summary: '爬取类型',
  })
  @Get('picType')
  resoType() {
    return this.myresourcesService.resoType();
  }

  @ApiOperation({
    summary: '爬取图片类型列表',
  })
  @Get('picList')
  resoList(@Query('page') page: number, @Query('type') type: string) {
    return this.myresourcesService.resoList(page, type);
  }

  @ApiOperation({
    summary: 'ID图片详情',
  })
  @Get('picDesc')
  resoDesc(@Query('id') id: string) {
    return this.myresourcesService.resoDesc(id);
  }
}

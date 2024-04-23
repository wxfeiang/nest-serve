import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Myresource, MyresourceId } from './entities/myresource.entity';
import { MyresourcesService } from './myresources.service';

@ApiTags('我的资源')
@Controller('myresources')
export class MyresourcesController {
  constructor(private readonly myresourcesService: MyresourcesService) { }

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

  @ApiOperation({
    summary: 'tbb网站类型',
  })
  @Get('tbbType')
  tbbType() {
    return this.myresourcesService.tbbType();
  }
  @ApiOperation({
    summary: 'tbb推荐导航',
  })
  @Get('tbbRecommRndedNavigation')
  tbbRecommRndedNavigation() {
    return this.myresourcesService.tbbRecommendedNavigation();
  }

  @ApiOperation({
    summary: 'tbb根据类型获取类型列表',
  })
  @Post('tbbTypeContList')
  tbbTypeContList(@Body() data: Myresource) {
    return this.myresourcesService.tbbTypeContList(data);
  }

  @ApiOperation({
    summary: 'tbb根据类型获取Id 详情',
  })
  @Post('tbbTypeDesc')
  tbbTypeDesc(@Body() data: MyresourceId) {
    return this.myresourcesService.tbbTypeDesc(data);
  }



  @ApiOperation({
    summary: '获取快手 hxx 视频',
  })
  @Post('kshxx')
  kshxx() {
    return this.myresourcesService.kshxx()
  }
}
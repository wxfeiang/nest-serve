import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { pageListEntity } from 'src/common/database/pageListEntity';
import { Serveresource } from './entities/serveresource.entity';
import { ServeresourceService } from './serveresource.service';

@ApiTags('服务器资源管理')
@Controller('serveresource')
export class ServeresourceController {
  constructor(private readonly serveresourceService: ServeresourceService) {}

  @ApiOperation({
    summary: '创建资源',
  })
  @Post()
  create(@Body() createServeresourceDto: Serveresource) {
    return this.serveresourceService.create(createServeresourceDto);
  }

  @ApiOperation({
    summary: '资源列表',
  })
  @Post('list')
  list(@Body() createServeresourceDto: Serveresource & pageListEntity) {
    return this.serveresourceService.list(createServeresourceDto);
  }
  @ApiOperation({
    summary: '根据id查询',
  })
  @Get()
  findOne(@Query('id') id: string) {
    return this.serveresourceService.findOne(id);
  }

  @ApiOperation({
    summary: '更新资源',
  })
  @Patch()
  update(@Body() updateServeresourceDto: Serveresource) {
    return this.serveresourceService.update(updateServeresourceDto);
  }

  @ApiOperation({
    summary: '删除',
  })
  @Delete()
  remove(@Query('id') id: string) {
    return this.serveresourceService.remove(id);
  }
}

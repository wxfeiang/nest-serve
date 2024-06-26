import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DictService } from './dict.service';
import { CreateDicTypeDto } from './dto/create-dict-type.dto';
import { CreateDictDto } from './dto/create-dict.dto';
import { QueryDict } from './dto/query-dict.dto';
import { UpdateDictDto } from './dto/update-dict.dto';

@ApiTags('字典管理')
@Controller('dict')
export class DictController {
  constructor(private readonly dictService: DictService) { }

  @ApiOperation({
    summary: '创建字典',
  })
  @Post()
  create(@Body() createDictDto: CreateDictDto) {
    return this.dictService.create(createDictDto);
  }


  @ApiOperation({
    summary: '查询字典列表/分页',
  })
  @Post('list')
  findAllList(@Body() QueryDict: QueryDict) {
    return this.dictService.findAllList(QueryDict);
  }

  @ApiOperation({
    summary: '查询字典所有',
  })
  @Get("all")
  findAll() {
    return this.dictService.findAll();
  }

  @ApiOperation({
    summary: '更新字典',
  })
  @Patch()
  update(@Body() updateDictDto: UpdateDictDto) {
    return this.dictService.update(updateDictDto);
  }
  @ApiOperation({
    summary: '删除字典',
  })
  @Delete()
  remove(@Query('id') id: string) {
    return this.dictService.remove(id);
  }

  /** 字典值  */

  @ApiOperation({
    summary: '添加字典值',
  })
  @Post('addDict')
  addDict(@Body() createDicTypetDto: CreateDicTypeDto) {
    return this.dictService.addDict(createDicTypetDto);
  }

  @ApiOperation({
    summary: '更新字典值',
  })
  @Post('updateDict')
  updateDict(@Body() createDicTypetDto: CreateDicTypeDto) {
    return this.dictService.updateDict(createDicTypetDto);
  }

  @ApiOperation({
    summary: '查询字典值',
  })
  @Get('getDict')
  getDict(@Query('id') type: string) {
    return this.dictService.findAllType(type);
  }

  @ApiOperation({
    summary: '删除字典值',
  })
  @Delete('delDict')
  delDict(@Query('id') id: string) {
    return this.dictService.delDict(id);
  }
}

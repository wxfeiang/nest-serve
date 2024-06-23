import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { isPublic } from 'src/auth/constants';
import { CreateDymockDto } from './dto/create-dymock.dto';
import { UpdateDymockDto } from './dto/update-dymock.dto';
import { DymockService } from './dymock.service';


@ApiTags('模拟数据')
@Controller('dymock')
export class DymockController {
  constructor(private readonly dymockService: DymockService) { }

  @Post()
  create(@Body() createDymockDto: CreateDymockDto) {
    return this.dymockService.create(createDymockDto);
  }

  @Get()
  findAll() {
    return this.dymockService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dymockService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDymockDto: UpdateDymockDto) {
    return this.dymockService.update(+id, updateDymockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dymockService.remove(+id);
  }

  @ApiOperation({
    summary: '获取题目',
    description: '题目信息',
  })
  @isPublic()
  @Post('/answer')
  findAnswer(@Body() size: number) {
    return this.dymockService.findAnswer(size);
  }
}

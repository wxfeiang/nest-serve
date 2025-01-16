import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { isPublic } from 'src/auth/constants';
import { DataServeService } from './data-serve.service';
import { CreateDataServeDto } from './dto/create-data-serve.dto';
import { UpdateDataServeDto } from './dto/update-data-serve.dto';



@ApiTags('数据服务')
@Controller('data-serve')
export class DataServeController {
  constructor(private readonly dataServeService: DataServeService) { }

  @Post()
  create(@Body() createDataServeDto: CreateDataServeDto) {
    return this.dataServeService.create(createDataServeDto);
  }

  @Get()
  findAll() {
    return this.dataServeService.findAll();
  }


  @ApiOperation({
    summary: 'cursor',
    description: 'cursor 设备码信息',
  })
  @Get(':id')
  @isPublic()
  findOne(@Param('id') id: string) {
    return this.dataServeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDataServeDto: UpdateDataServeDto) {
    return this.dataServeService.update(+id, updateDataServeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dataServeService.remove(+id);
  }
}

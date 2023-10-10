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
import { CreateIndividualtaxDto } from './dto/create-individualtax.dto';
import { UpdateIndividualtaxDto } from './dto/update-individualtax.dto';
import { IndividualtaxesService } from './individualtaxes.service';

@ApiTags('个税记录')
@Controller('individualtaxes')
export class IndividualtaxesController {
  constructor(
    private readonly individualtaxesService: IndividualtaxesService,
  ) {}

  @ApiOperation({
    summary: '新增记录',
  })
  @Post()
  create(@Body() createIndividualtaxDto: CreateIndividualtaxDto) {
    return this.individualtaxesService.create(createIndividualtaxDto);
  }

  @ApiOperation({
    summary: '根据用户ID查询',
  })
  @Get()
  findOneList(@Query('eId') eId: string) {
    return this.individualtaxesService.findOneList(eId);
  }

  @ApiOperation({
    summary: '更新',
  })
  @Patch()
  update(@Body() updateIndividualtaxDto: UpdateIndividualtaxDto) {
    return this.individualtaxesService.update(updateIndividualtaxDto);
  }

  @ApiOperation({
    summary: '删除',
  })
  @Delete()
  remove(@Query('id') id: string) {
    return this.individualtaxesService.remove(id);
  }
}

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
import { User } from 'src/common/decorators/user.decorator';
import { Employee } from 'src/employee/entities/employee.entity';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenuService } from './menu.service';

@ApiTags('菜单管理')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Get()
  findAll() {
    return this.menuService.findAll();
  }

  @Get()
  findOne(@Query('id') id: string) {
    return this.menuService.findOne(id);
  }

  @Patch()
  update(@Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(updateMenuDto);
  }

  @Delete()
  remove(@Query('id') id: string) {
    return this.menuService.remove(id);
  }

  @Get('tree')
  tree() {
    return this.menuService.tree();
  }

  /**
   * @description: 获取角色对应的菜单树
   * @return {}
   */
  @ApiOperation({
    summary: '获取角色对应的菜单树',
  })
  @Get('roleMenu')
  roleMenu(@User() user: Employee) {
    console.log('🥞[user]:', user);
    // TODO: 改造token 获取用户所有信息、、、、
    return this.menuService.roleMenu(user.id);
  }
}

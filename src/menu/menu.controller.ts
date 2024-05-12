import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query
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
  constructor(private readonly menuService: MenuService) { }

  @ApiOperation({
    summary: '创建菜单',
  })
  @Post()
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @ApiOperation({
    summary: '获取菜单表',
  })
  @Get("/list")
  findAll() {
    return this.menuService.findAll();
  }

  @ApiOperation({
    summary: '更新菜单',
  })
  @Put()
  update(@Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(updateMenuDto);
  }

  @ApiOperation({
    summary: '菜单ID删除菜单',
  })
  @Delete()
  remove(@Query('id') id: string) {
    return this.menuService.remove(id);
  }



  /**
   * @description: 员工(角色)Id 对应的菜单
   * @return {}
   */

  @ApiOperation({
    summary: '员工(角色)Id对应的菜单',
  })
  @Get()
  findOne(@Query('id') id: string) {
    return this.menuService.findOne(id);
  }

  /**
   * @description: 获取菜单树
   * @return {}
   */
  @ApiOperation({
    summary: '获取菜单树',
  })
  @Get('tree')
  tree() {
    return this.menuService.tree();
  }

  /**
   * @description: 获取角色对应的菜单树
   * @return {}
   */
  @ApiOperation({
    summary: '获取角色Id对应的菜单树',
  })
  @Get('roleMenuTree')
  roleMenuTree(@Query('id') id: string, @User() user: Employee) {
    return this.menuService.roleMenu(id || user.role[0].id);
  }
}

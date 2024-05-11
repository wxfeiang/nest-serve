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
import { pageListEntity } from 'src/common/database/pageListEntity';
import { pageInfo } from 'src/common/decorators/pageInfo.decorator';
import { QueryRole } from './dto/query-role.dto';
import { Role } from './entities/role.entity';
import { RoleService } from './role.service';

@ApiTags('角色管理')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @ApiOperation({
    summary: '创建角色',
  })
  @Post()
  create(@Body() role: Role) {
    return this.roleService.create(role);
  }

  @ApiOperation({
    summary: '更新当前角色数据',
  })
  @Put("")
  update(@Body() role: Role) {
    return this.roleService.update(role);
  }



  @ApiOperation({
    summary: '全部角色列表',
  })
  @Post('list')
  findAllList(@Body() role: QueryRole, @pageInfo() pageInfo: pageListEntity) {
    return this.roleService.findAllList({ ...role, ...pageInfo });
  }


  @ApiOperation({
    summary: '获取全部角色',
  })
  @Get('all')
  findAll() {
    return this.roleService.findAll();
  }



  @ApiOperation({
    summary: '删除角色',
  })

  @Delete()
  remove(@Query('id') id: string) {
    return this.roleService.remove(id);
  }

  @ApiOperation({
    summary: '更新角色--（包含菜单[]）角色分派权限',
  })
  @Put("/updateRole")
  updateRole(@Body() role: Role) {
    return this.roleService.updateRole(role);
  }




  @ApiOperation({
    summary: 'ID查询角色-权限(包含的菜单)',
  })
  @Get("/rolePermissions")
  findOne(@Query('id') id: string) {
    return this.roleService.findOne(id);
  }


  @ApiOperation({
    summary: '员工ID查询拥有角色',
  })
  @Get('getRoles')
  getRoles(@Query('id') id: string) {
    return this.roleService.getRoles(id);
  }
}

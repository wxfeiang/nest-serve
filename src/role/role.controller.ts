import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EmpRole } from './entities/empRole.entity';
import { Role } from './entities/role.entity';
import { RoleService } from './role.service';

@ApiTags('角色管理')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({
    summary: '创建角色',
  })
  @Post()
  create(@Body() role: Role) {
    return this.roleService.create(role);
  }

  @ApiOperation({
    summary: '获取全部角色',
  })
  @Get('all')
  findAll() {
    return this.roleService.findAll();
  }

  @ApiOperation({
    summary: 'ID查询角色',
  })
  @Get()
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(id);
  }

  @ApiOperation({
    summary: '更新角色',
  })
  @Put()
  update(@Body() role: Role) {
    return this.roleService.update(role);
  }
  @ApiOperation({
    summary: '删除角色',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(id);
  }

  /** 角色关系-- */
  @ApiOperation({
    summary: '员工角色添加',
  })
  @Post('addEmpRole')
  addEmpRole(@Body() empRole: EmpRole) {
    return this.roleService.addEmpRole(empRole);
  }

  @ApiOperation({
    summary: '员工角色删除',
  })
  @Post('delEmpRole')
  delEmpRole(@Body() empRole: EmpRole) {
    return this.roleService.delEmpRole(empRole);
  }
}

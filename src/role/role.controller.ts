import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role } from './entities/role.entity';
import { RoleService } from './role.service';

@ApiTags('角色管理')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() role: Role) {
    return this.roleService.create(role);
  }

  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @Get()
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(id);
  }

  @Put()
  update(@Body() role: Role) {
    return this.roleService.update(role);
  }

  @Delete()
  remove(@Param('id') id: string) {
    return this.roleService.remove(id);
  }
}

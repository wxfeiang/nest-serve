import { Injectable, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepositroy: Repository<Role>,
  ) {}

  findAll() {
    return this.roleRepositroy.find(); // 提
  }

  create(role: Role) {
    return this.roleRepositroy.save(role);
  }
  findOne(@Param('id') id: string) {
    return this.roleRepositroy.findOneBy({ id });
  }

  update(role: Role) {
    console.log('🥪[role]:', role);
    return this.roleRepositroy.update({ id: role.id }, role);
  }

  remove(id: Role['id']) {
    return this.roleRepositroy.delete({ id });
  }
}

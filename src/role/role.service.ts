import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EmpRole } from './entities/empRole.entity';
import { Role } from './entities/role.entity';
import { RoleMenu } from './entities/roleMenu.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepositroy: Repository<Role>,
    @InjectRepository(EmpRole)
    private readonly EmpRolepositroy: Repository<EmpRole>,
    @InjectRepository(RoleMenu)
    private readonly RoleMenupositroy: Repository<EmpRole>,
  ) {}

  findAll() {
    return this.roleRepositroy.find(); // 提
  }

  async create(role: Role) {
    return this.roleRepositroy.save(role);
  }
  findOne(id: string) {
    return this.roleRepositroy.findOne({
      // select: ['id', 'mId'],
      relations: ['roleMenu'],
      where: {
        id,
      },
    });
  }

  async update(role: Role) {
    const ids = role.roleMenu;
    const arr: RoleMenu[] = [];
    if (ids) {
      // 先删除之前的
      this.RoleMenupositroy.delete({ rId: role.id });
      for (let i = 0; i < ids.length; i++) {
        const T = new RoleMenu();
        T.mId = ids[i] as unknown as string;
        await this.RoleMenupositroy.save(T);
        arr.push(T);
      }
    }
    role.roleMenu = arr;
    return this.roleRepositroy.save(role);
  }

  remove(id: Role['id']) {
    return this.roleRepositroy.delete({ id });
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EmpRole } from './entities/empRole.entity';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepositroy: Repository<Role>,
    @InjectRepository(EmpRole)
    private readonly EmpRolepositroy: Repository<EmpRole>,
  ) {}

  findAll() {
    return this.roleRepositroy.find(); // 提
  }

  create(role: Role) {
    return this.roleRepositroy.save(role);
  }
  findOne(id: string) {
    return this.roleRepositroy.findOne({
      relations: ['roleMenu'],
      where: {
        id,
      },
    });
  }

  update(role: Role) {
    return this.roleRepositroy.update({ id: role.id }, role);
  }

  remove(id: Role['id']) {
    return this.roleRepositroy.delete({ id });
  }

  /**
   * @description: 添加用户角色 //TODO:后期修改
   * @return {}
   */
  addEmpRole(empRole: EmpRole) {
    return this.EmpRolepositroy.save(empRole);
  }
  /**
   * @description: 删除用户角色
   * @return {}
   */
  async delEmpRole(empRole: EmpRole) {
    return await this.EmpRolepositroy.delete({
      eId: empRole.eId,
      rId: empRole.rId,
    });
  }
}

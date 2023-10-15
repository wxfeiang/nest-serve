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
      relations: ['roleMenu'],
      where: {
        id,
      },
    });
  }

  async update(role: Role) {
    let ids = role.roleMenu;
    if (ids) {
      for (let i = 0; i < ids.length; i++) {
        let T = new RoleMenu();
        T.mId = ids[i] as unknown as string;
        T.rId = role.id;
        console.log('🍎[T.rId]:', T);
        await this.RoleMenupositroy.save(T);
      }
    }
    //return this.roleRepositroy.save(role);
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

  /**
   * @description: 添加/编辑==角色菜单
   * @return {}
   */
}

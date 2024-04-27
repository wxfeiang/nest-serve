import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { BasePage } from 'src/common/database/pageInfo';
import { pageListEntity } from 'src/common/database/pageListEntity';
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
    private readonly RoleMenupositroy: Repository<RoleMenu>,
  ) {}

  findAll() {
    return this.roleRepositroy.find(); // 提
  }

  async findAllList(role: Role & pageListEntity) {
    const { currentPage = 1, pageSize = 1000, name } = role;
    const [employeeList, total] = await this.roleRepositroy.findAndCount({
      where: {
        name: Like(`%${name || ''}%`),
      },
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
    });
    return new BasePage(currentPage, pageSize, total, employeeList);
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

  /**
   *
   * @returns 根据ID查询角色
   */

  async getRoles(id: string) {
    return await this.roleRepositroy
      .createQueryBuilder()
      .innerJoin(EmpRole, 'empRole', 'role.id = empRole.rId')
      .where('empRole.eId =' + id)
      .getMany();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { BasePage } from 'src/common/database/pageInfo';
import { QueryRole } from './dto/query-role.dto';
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
  ) { }

  findAll() {
    return this.roleRepositroy.find(); // 提
  }

  async findAllList(role: QueryRole) {
    const { currentPage, pageSize, ...surPlus } = role;
    const arr = Object.keys(surPlus);
    const whereData = {}
    if (arr?.length > 0) {
      arr.forEach((item) => {
        if (surPlus[item]) {
          whereData[item] = Like(surPlus[item])
        }
      })
    }
    const [employeeList, total] = await this.roleRepositroy.findAndCount({
      where: {
        ...whereData
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



    const arr: RoleMenu[] = [];
    if (role.roleMenu) {
      // 先删除之前的
      const ids = role.roleMenu;
      this.RoleMenupositroy.delete({ rId: role.id });
      for (let i = 0; i < ids.length; i++) {
        const T = new RoleMenu();
        T.rId = role.id;
        T.mId = ids[i] as unknown as string;
        await this.RoleMenupositroy.save(T);
        arr.push(T);
      }
      role.roleMenu = arr;
    }
    const data = await this.roleRepositroy.save(role);
    return data?.id ? true : false;
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

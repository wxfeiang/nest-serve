import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { listToTree } from 'src/common/utils';
import { RoleMenu } from 'src/role/entities/roleMenu.entity';
import { Repository } from 'typeorm';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly MenuRpositroy: Repository<Menu>,
  ) { }

  create(createMenuDto: CreateMenuDto) {
    return this.MenuRpositroy.save(createMenuDto);
  }

  findAll() {
    return this.MenuRpositroy.find({
      order: {
        sort: 'DESC',
      },
    });
  }

  findOne(id: string) {
    return this.MenuRpositroy.findOneBy({ id });
  }

  async update(updateMenuDto: UpdateMenuDto) {
    return !!(
      await this.MenuRpositroy.update({ id: updateMenuDto.id }, updateMenuDto)
    ).affected;
  }

  async remove(id: string) {
    return !!(await this.MenuRpositroy.delete({ id })).affected;
  }

  async tree() {
    return listToTree(await this.MenuRpositroy.find());
  }

  async roleMenu(rId) {
    //   const sql = `
    //   SELECT
    //   *
    // FROM
    //   menu AS m
    //   INNER JOIN
    //   role_menu AS r
    //   WHERE
    //    m.id = r.m_id;

    //   `;
    // . 动态ID
    return listToTree(
      await this.MenuRpositroy.createQueryBuilder()
        .innerJoin(RoleMenu, 'roleMenu', 'menu.id = roleMenu.mId')
        .where('roleMenu.rId =' + rId)
        .getMany(),
    );
  }
}

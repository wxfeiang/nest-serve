import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { listToTree } from 'src/common/utils';
import { Repository } from 'typeorm';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly MenuRpositroy: Repository<Menu>,
  ) {}

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
    console.log('🍉[updateMenuDto]:', updateMenuDto);
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
}

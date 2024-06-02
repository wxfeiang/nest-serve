import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BasePage } from 'src/common/database/pageInfo';
import { Like, Repository } from 'typeorm';
import { CreateDicTypeDto } from './dto/create-dict-type.dto';
import { CreateDictDto } from './dto/create-dict.dto';
import { QueryDict } from './dto/query-dict.dto';
import { UpdateDictDto } from './dto/update-dict.dto';
import { Dict } from './entities/dict.entity';
import { DictType } from './entities/dictType.entity';

@Injectable()
export class DictService {
  constructor(
    @InjectRepository(Dict)
    private readonly Dictpositroy: Repository<Dict>,
    @InjectRepository(DictType)
    private readonly DictTypepositroy: Repository<DictType>,
  ) { }
  create(createDictDto: CreateDictDto) {
    // save 有ID更🆕
    return this.Dictpositroy.save(createDictDto);
  }


  /**
      *
      * @param dict
      * @returns 查询列表分页
      */
  async findAllList(dict: QueryDict) {

    const { currentPage, pageSize, ...surPlus } = dict;
    const arr = Object.keys(surPlus);
    const whereData = {}
    if (arr?.length > 0) {
      arr.forEach((item) => {
        if (surPlus[item]) {
          whereData[item] = Like(`%${surPlus[item]}%`)
        }
      })
    }
    const [list, total] = await this.Dictpositroy.findAndCount({
      where: {
        ...whereData
      },
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
    });
    return new BasePage(currentPage, pageSize, total, list);
  }


  findAll() {
    return this.Dictpositroy.find();
  }

  findOne(id: string) {
    return this.Dictpositroy.findOneBy({ id });
  }

  update(updateDictDto: UpdateDictDto) {
    // 两种方法都行
    // return this.Dictpositroy.save(updateDictDto);
    return this.Dictpositroy.update({ id: updateDictDto.id }, updateDictDto);
  }

  remove(id: string) {
    return this.Dictpositroy.delete({ id });
  }
  /** 字典值  */

  /**
   * @description:  查询字典值
   * @param {} name
   * @return {}
   */
  findAllType(id: string) {
    return this.DictTypepositroy.find({
      where: {
        dId: id,
        status: 1
      },
    });
  }

  addDict(createDicTypetDto: CreateDicTypeDto) {
    return this.DictTypepositroy.save(createDicTypetDto);
  }

  updateDict(createDicTypetDto: CreateDicTypeDto) {
    return this.DictTypepositroy.update(
      { id: createDicTypetDto.id },
      createDicTypetDto,
    );
  }

  delDict(id: string) {
    return this.DictTypepositroy.delete({ id });
  }
}

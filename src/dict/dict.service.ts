import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDicTypeDto } from './dto/create-dict-type.dto';
import { CreateDictDto } from './dto/create-dict.dto';
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
  ) {}
  create(createDictDto: CreateDictDto) {
    // save 有ID更🆕
    return this.Dictpositroy.save(createDictDto);
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
  findAllType(name: string) {
    return this.DictTypepositroy.find({
      where: {
        name,
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

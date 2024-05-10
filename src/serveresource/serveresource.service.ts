import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BasePage } from 'src/common/database/pageInfo';
import { Like, Repository } from 'typeorm';
import { QueryServeresourceDto } from './dto/query-serveresource.dto';
import { Serveresource } from './entities/serveresource.entity';

@Injectable()
export class ServeresourceService {
  constructor(
    @InjectRepository(Serveresource)
    private readonly serveresourceSitory: Repository<Serveresource>,
  ) { }

  create(createServeresourceDto: Serveresource) {
    return this.serveresourceSitory.save(createServeresourceDto);
  }

  async list(serveresource: QueryServeresourceDto) {
    const { currentPage, pageSize, name } = serveresource;
    const [employeeList, total] = await this.serveresourceSitory.findAndCount({
      where: {
        name: Like(`%${name || ''}%`),
      },
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
    });
    return new BasePage(currentPage, pageSize, total, employeeList);
  }

  findOne(id: string) {
    return this.serveresourceSitory.find({
      where: {
        id,
      },
    });
  }

  async update(createDicTypetDto: Serveresource) {
    return !!(
      await this.serveresourceSitory.update(
        { id: createDicTypetDto.id },
        createDicTypetDto,
      )
    ).affected;
  }

  async remove(id: string) {
    return !!(await this.serveresourceSitory.delete({ id })).affected;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateIndividualtaxDto } from './dto/create-individualtax.dto';
import { UpdateIndividualtaxDto } from './dto/update-individualtax.dto';
import { IndividualTaxes } from './entities/individualtax.entity';

@Injectable()
export class IndividualtaxesService {
  constructor(
    @InjectRepository(IndividualTaxes)
    private readonly Individualtaxpositroy: Repository<IndividualTaxes>,
  ) {}

  create(createIndividualtaxDto: CreateIndividualtaxDto) {
    return this.Individualtaxpositroy.save(createIndividualtaxDto);
  }

  findOneList(eId: string, date?: string) {
    return this.Individualtaxpositroy.find({
      where: {
        eId,
        date,
      },
      order: {
        date: 'DESC',
      },
    });
  }

  async update(updateIndividualtaxDto: UpdateIndividualtaxDto) {
    return !!(
      await this.Individualtaxpositroy.update(
        { id: updateIndividualtaxDto.id },
        updateIndividualtaxDto,
      )
    ).affected;
  }

  async remove(id: string) {
    return !!(await this.Individualtaxpositroy.delete({ id })).affected;
  }
}

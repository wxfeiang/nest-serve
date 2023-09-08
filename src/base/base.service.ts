import { Injectable } from '@nestjs/common';

@Injectable()
export class BaseService {
  findAll() {
    return `This action returns all base`;
  }

  findOne(id: number) {
    return `This action returns a #${id} base`;
  }

  remove(id: number) {
    return `This action removes a #${id} base`;
  }
}

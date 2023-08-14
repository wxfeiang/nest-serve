import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  findOne(username: string): string {
    if (username === 'Kid') {
      return 'Kid is here';
    }
    return 'eeror No one here';
  }
  getOne() {
    return 'get No one here';
  }
}

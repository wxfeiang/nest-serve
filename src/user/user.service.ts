import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  // 通过构造函数注入
  constructor(
    @InjectRepository(User) private readonly userRepositroy: Repository<User>,
  ) {}
  // 直接注入
  // @InjectRepository(User)
  // private userRepositroy: Repository<User>;

  list() {
    // FIx: 查询使用 sql  其他都是用提供的方法
    const sql = `
    SELECT
      *
    FROM
      user
  `;
    // return this.userRepositroy.find(); // 提供的简单方法
    return this.userRepositroy.query(sql); // sql
  }

  save(user: User) {
    //   const sql = `
    //   INSERT INTO
    //   user
    //   (id,name,passowrd,nickName)
    //   VALUES (${user.id}, ${user.name},${user.passowrd},${user.nickName})
    // `;

    console.log('🍐[user]:', user);
    return this.userRepositroy.save(user);
  }

  update(user: User) {
    return this.userRepositroy.update({ id: user.id }, user);
  }

  delete(id: User['id']) {
    return this.userRepositroy.delete({ id });
  }
}

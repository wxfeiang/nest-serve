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

  /**
   *
   * @returns 列表查询
   */
  list() {
    const sql = `
    SELECT
      *
    FROM
      user
  `;
    return this.userRepositroy.find(); // 提供的简单方法
    // return this.userRepositroy.query(sql); // sql
  }
  /**
   *
   * @param user
   * @returns 新增用户
   */
  save(user: User) {
    const sql = `
    INSERT INTO
    user
    (id,name,passowrd,nickName)
    VALUES (${user.id}, ${user.name},${user.passowrd},${user.nickName})
  `;
    return this.userRepositroy.save(user);
    // return this.userRepositroy.;
  }

  /**
   *
   * @param user
   * @returns 更新
   */
  update(user: User) {
    return this.userRepositroy.update({ id: user.id }, user);
  }

  /**
   *
   * @param user
   * @returns 删除
   */
  delete(id: User['id']) {
    return this.userRepositroy.delete({ id });
  }
}

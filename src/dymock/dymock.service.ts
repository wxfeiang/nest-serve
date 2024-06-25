import { Injectable } from '@nestjs/common';

import { CreateDymockDto } from './dto/create-dymock.dto';
import { UpdateDymockDto } from './dto/update-dymock.dto';

var Mock = require('mockjs');//引入mock

@Injectable()

export class DymockService {
  create(createDymockDto: CreateDymockDto) {
    return 'This action adds a new dymock';
  }

  findAll() {
    return `This action returns all dymock`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dymock`;
  }

  update(id: number, updateDymockDto: UpdateDymockDto) {
    return `This action updates a #${id} dymock`;
  }

  remove(id: number) {
    return `This action removes a #${id} dymock`;
  }


  /**
   * @description: 查询考试题
   * @param {} size
   * @return {}
   */
  findAnswer(size: number) {
    //  size: 1 考试 2 练习 3错题 4 收藏
    // Mock.js的规则
    const Random = Mock.Random

    const data = Mock.mock({
      'answer|5-20': [
        {
          'id': "@id",
          'name': '@ctitle( 5, 10 )' + '?',
          "options|4-6": [
            {
              'id': "@id",
              "name": '@ctitle( 5, 30)' + '.',
              "value|+1": 1,
            }
          ],
          "type|1": ['checkbox', 'radio'],
          "answer": "",
          "score 2-5": 4,
          'explain': '@cparagraph(1, 6)',
          "difficulty|1-5": 5,
          "errorRate|20-100": 1,
          'isCollect': size == 4 ? true : false
        },
      ],
    })
    data.answer.forEach(item => {
      const l = item.options.length;
      const random = Math.round(Math.random() * (l - 1) + 0);
      if (size != 1) {
        if (item.type === 'checkbox') {
          let arr = item.options.map(item => item.value)
          arr.splice(random, 1)
          item.answer = JSON.stringify(arr)

        } else {
          item.answer = item.options.find(i => item.options[random]).value

        }

      }


    });
    return data.answer

  }

}

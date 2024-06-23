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
    // Mock.js的规则
    const Random = Mock.Random

    const data = Mock.mock({
      'answer|5-50': [
        {
          'id': "@id",
          'name': '@ctitle( 5, 10 )' + '?',
          "options|2-5": [
            {
              'id': "@id",
              "name": '@ctitle( 5, 30)' + '.',
              "value|+1": 1,
            }

          ],
          "type|1": ['checkbox', 'radio'],
          "answer": "",
          "score": 0,
          'explain': '@cparagraph(1, 6)',
          "difficulty|1-5": 5,
          "errorRate|20-100": 1
        },
      ],
    })
    data.answer.forEach(item => {
      const l = item.options.length;
      const random = Math.round(Math.random() * (l - 1) + 0);
      console.log('🍸[random]:', random);
      if (item.type === 'checkbox') {
        let arr = item.options.map(item => item.value)
        arr.splice(random, 1)
        item.answer = JSON.stringify(arr)
        item.score = 4
      } else {
        item.answer = item.options.find(i => item.options[random]).value
        item.score = 2
      }

    });
    return data.answer

  }

}

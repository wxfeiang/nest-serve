import { Injectable } from '@nestjs/common';
import { getConfig } from 'src/common/utils/ymlConfig';
import * as svgCaptcha from 'svg-captcha';
@Injectable()
export class BaseService {
  // 验证码
  async captchaImage(session, CaptchaImageDto) {
    const captcha = svgCaptcha.create({
      size: 4, //验证码长度
      fontSize: 30,
      width: 120,
      height: 30,
      background: '#fff', //背景颜色
      ...CaptchaImageDto
    });
    session.code = captcha.text; //session保存验证码
    const buffer = Buffer.from(captcha.data, 'utf-8');
    const base64String = buffer.toString('base64');

    const data = {
      code: captcha.text,
      data: base64String,
    }
    // res.type('image/svg+xml')
    // res.send(captcha.data)
    // captcha.data
    return process.env.DATA_SHOW_CODE ? { ...data } : captcha.data; // aptcha.data  返回的是svg图

  }
  // 本地上传
  async uploadLocal(file, host) {
    // 如果是 localhost 就加上http://
    if (!host.includes('://')) {
      host = `http://${host}/v${getConfig('VERSION').index}/`;
    }
    const data = {
      url: file.path,
      base: host,
    };
    return data;
  }
}

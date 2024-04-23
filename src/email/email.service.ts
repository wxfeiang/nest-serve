import { Injectable } from '@nestjs/common';

import { Transporter, createTransport } from 'nodemailer';
import { CustomException } from 'src/common/exceptions/custom.exception';
import { getConfig } from 'src/common/utils/ymlConfig';
import { CreateEmailDto } from './dto/create-email.dto';

@Injectable()
export class EmailService {
  transporter: Transporter;
  constructor() {
    this.transporter = createTransport({
      host: getConfig('EMAIL').host, // smtp服务的域名
      port: getConfig('EMAIL').port, // smtp服务的端口
      secure: false,
      auth: {
        user: getConfig('EMAIL').user, // 你的邮箱地址
        pass: getConfig('EMAIL').pass, // 你的授权码
      },
    });
  }

  async sendMail(email: CreateEmailDto, session) {
    //生成随机四位数
    const emailCaptcha = Math.floor(Math.random() * 9000) + 1000;
    session.emailCode = emailCaptcha; //session保存验证码
    try {
      await this.transporter.sendMail({
        from: {
          name: getConfig('EMAIL').sendName,
          address: getConfig('EMAIL').user, // 你的邮箱地址
        },
        to: email.email, // 收件人邮箱地址
        subject: 'nest平台邮箱检验提醒',
        html: `<div>
        您本次的验证码是<span style="color:#FFB6C1; font-weight:700; font-size:24px">${emailCaptcha}</span>, 验证码有效期是3分钟 </div>`,
      });
      return '发送成功';
    } catch (error) {
      throw new CustomException(error);
    }
  }

  async teskSendTest(){

       console.log('定时任务------');
  }
}

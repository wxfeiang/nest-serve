import { Body, Controller, Post, Session } from '@nestjs/common';
// import { CreateEmailDto } from './dto/create-email.dto';
// import { UpdateEmailDto } from './dto/update-email.dto';
import { Cron } from '@nestjs/schedule';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateEmailDto } from './dto/create-email.dto';
import { EmailService } from './email.service';
@ApiTags('邮件信息')
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @ApiOperation({
    summary: '获取邮件',
  })
  @Post('/sendMail')
  sendMail(@Body() email: CreateEmailDto, @Session() session) {
    return this.emailService.sendMail(email, session);
  }


  @Cron('45 * * * * *')
  handleCron() {
    this.emailService.teskSendTest()
  }
}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sendgridMail from '@sendgrid/mail';

@Injectable()
export class SendMailService {
  constructor(private readonly configService: ConfigService) {}

  async settingMail(to: string, code: string) {
    const email = {
      from: 'fireking5997@kakao.com',
      to,
      html: '<h1></h1>',
      template_id: 'd-f59c8dcc1fae4ab8925cf0a468ea21d4',

      dynamic_template_data: {
        code,
      },
    };
    sendgridMail.setApiKey(this.configService.get('MAIL_KEY'));
    await sendgridMail.send(email);
  }
}

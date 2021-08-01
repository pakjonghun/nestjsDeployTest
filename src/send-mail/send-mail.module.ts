import { Module } from '@nestjs/common';
import { SendMailService } from './send-mail.service';

@Module({
  exports: [SendMailService],
  providers: [SendMailService],
})
export class SendMailModule {}

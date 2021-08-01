import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from 'src/jwt/jwt.module';
import { SendMailModule } from 'src/send-mail/send-mail.module';
import { Verifies } from './entities/verify.entity';
import { UserRepotory } from './repotory/user.repotory';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  exports: [UserService],
  imports: [
    TypeOrmModule.forFeature([UserRepotory, Verifies]),
    JwtModule,
    SendMailModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

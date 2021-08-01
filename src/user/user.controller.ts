import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/auth.guard';
import { getUser } from 'src/common/userDecotraor';
import { Verified } from 'src/common/verified.decorator';
import { JoinDTO } from './dtos/join.dto';
import { LoginDTO } from './dtos/login.dto';
import { VerifyDTO } from './dtos/verify.dto';
import { Users } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/join')
  join(@Body() data: JoinDTO) {
    return this.userService.join(data);
  }

  @Post('/login')
  login(@Body() data: LoginDTO) {
    return this.userService.login(data);
  }

  @Post('/verify')
  auth(@getUser() user: Users, @Body() data: VerifyDTO) {
    return this.userService.verifyEmail(user, data);
  }

  @Verified('notVerified')
  @Get('/me')
  me() {
    return this.userService.me();
  }
}

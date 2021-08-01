import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { UserService } from 'src/user/user.service';
import { responses } from '../commonMessages';

@Injectable()
export class ConfirmUserExist implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (req.body['confirm']) {
      return next();
    }

    if ('nickName' in req.body) {
      const exist = await this.userService.checkNickName(req.body['nickName']);
      if (exist) {
        return res.json(responses.commonExist('닉네임'));
      }
    }

    if ('socialId' in req.body && 'password' in req.body) {
      const exist = await this.userService.checkSocialId(req.body['socialId']);
      if (exist) {
        return res.json(responses.askUpdate);
      }
    }

    if ('realId' in req.body) {
      const exist = await this.userService.checkUserExist(req.body['realId']);
      if (exist) {
        return res.json(responses.commonExist('이메일'));
      }
    }

    return next();
  }
}

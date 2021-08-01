import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { responses } from '../commonMessages';
import * as jwt from 'jsonwebtoken';
import { JwtService } from 'src/jwt/jwt.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TokenAuthMiddleWare implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if ('authorization' in req.headers) {
      const tokenArray = req.headers['authorization'].split(' ');
      if (tokenArray[0] !== 'Bearer') {
        return res.json(responses.commonToken);
      }

      const token = tokenArray.pop();
      const nickNameObj = this.jwtService.verify(token);
      if (typeof nickNameObj === 'object' && 'nickName' in nickNameObj) {
        nickNameObj['nickName'];
        const user = await this.userService.findUserByNickName(
          nickNameObj['nickName'],
        );
        req['user'] = user;
      }
    }
    next();
  }
}

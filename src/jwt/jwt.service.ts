import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  constructor(private readonly configService: ConfigService) {}

  sign(nickName: string): string {
    return jwt.sign({ nickName }, this.configService.get('TOKEN_SECRET'));
  }

  verify(token: string): string | jwt.JwtPayload {
    try {
      const result = jwt.verify(token, this.configService.get('TOKEN_SECRET'));
      return result;
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}

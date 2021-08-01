import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Users } from 'src/user/entities/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext) {
    const ver = this.reflector.get('ver', context.getHandler());
    console.log(ver);
    const request = context.switchToHttp().getRequest();
    const user: Users = request['user'];

    if (!ver) return true;
    if (ver && !user) false;
    return user.isVerified === ver;
  }
}

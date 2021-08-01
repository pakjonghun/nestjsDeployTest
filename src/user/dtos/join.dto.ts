import { OmitType } from '@nestjs/swagger';
import { Users } from '../entities/user.entity';

export class JoinDTO extends OmitType(Users, [
  'createdAt',
  'id',
  'isVerified',
  'updatedAt',
]) {}

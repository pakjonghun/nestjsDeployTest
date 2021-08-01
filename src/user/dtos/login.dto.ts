import { PickType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CommonOutput } from 'src/common/dtos/common.dto';
import { Users } from '../entities/user.entity';

export class LoginDTO extends PickType(Users, ['password', 'realId']) {}

export class LoginOutput extends CommonOutput {
  @IsOptional()
  @IsString()
  token?: string;
}

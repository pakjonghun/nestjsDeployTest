import { PickType } from '@nestjs/swagger';
import { Verifies } from '../entities/verify.entity';

export class VerifyDTO extends PickType(Verifies, ['code']) {}

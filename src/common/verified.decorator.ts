import { SetMetadata } from '@nestjs/common';
import { verified } from 'src/user/entities/user.entity';
export type ver = keyof typeof verified;

export const Verified = (ver: ver) => SetMetadata('ver', ver);

import * as bcrypt from 'bcrypt';

import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { CommonEntity } from 'src/common/entities/common.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';

export enum verified {
  verified = 'verified',
  notVerified = 'notVerified',
}

@Entity()
export class Users extends CommonEntity {
  @Column({ unique: true })
  @IsString()
  @Matches(/^[a-z0-9!-=]*$/i, {
    message: '알파벳대소문자, 숫자, 특수문자만 허용, 공백은 안됩니다.',
  })
  @Length(3, 20, { message: '3자이상 20자 이하' })
  nickName: string;

  @IsString()
  @Length(8, 20, { message: '비밀번호는 8~20로 입력하세요' })
  @IsOptional()
  @Matches(/^[a-z0-9!-=]*$/i, {
    message: '알파벳대소문자 숫자 특수문자 허용, 공백은 안됩니다.',
  })
  passwordConfirm;

  @Column({ nullable: true, unique: true })
  @IsEmail({}, { message: '이메일형식을 지키세요' })
  @IsOptional()
  realId?: string;

  @Column({ default: verified.notVerified })
  @IsEnum(verified)
  isVerified: verified;

  @Column({ nullable: true, select: false })
  @IsString()
  @Length(8, 20, { message: '비밀번호는 8~20로 입력하세요' })
  @IsOptional()
  @Matches(/^[a-z0-9!-=]*$/i, {
    message: '알파벳대소문자 숫자 특수문자 허용, 공백은 안됩니다.',
  })
  password?: string;

  @Column({ nullable: true, unique: true })
  @Matches(/^[a-zA-Z0-9\S]*$/)
  @IsOptional()
  socialId?: string;

  @Column({ nullable: true })
  @IsOptional()
  @Matches(/^[0-9-\S]*$/, { message: '숫자 -만 허용됩니다. 공백은 안됩니다.' })
  phoneNumber?: number;

  @BeforeUpdate()
  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  async checkPassword(password): Promise<Boolean> {
    return bcrypt.compare(password, this.password);
  }
}

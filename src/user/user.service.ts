import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { responses } from 'src/common/commonMessages';
import { JwtService } from 'src/jwt/jwt.service';
import { SendMailService } from 'src/send-mail/send-mail.service';
import { Repository } from 'typeorm';
import { JoinDTO } from './dtos/join.dto';
import { LoginDTO, LoginOutput } from './dtos/login.dto';
import { VerifyDTO } from './dtos/verify.dto';
import { Users, verified } from './entities/user.entity';
import { Verifies } from './entities/verify.entity';
import { UserRepotory } from './repotory/user.repotory';

@Injectable()
export class UserService {
  constructor(
    private readonly users: UserRepotory,
    private readonly jwtService: JwtService,
    private readonly sendMailService: SendMailService,
    @InjectRepository(Verifies) private readonly verifies: Repository<Verifies>,
  ) {}

  async join(data: JoinDTO) {
    try {
      //소셜아이디가 오면 있는지 확인한 다음 없으면 가입시키고 있으면 패스워드 있는지 확인하고 패스워드 있으면 업뎃하냐고 물어보고
      //업뎃 ㅇㅋ 하면 업뎃 시키고 끝
      if ('socialId' in data) {
        await this.users.save({ ...data });
        return responses.commonTrue;
      }

      //이메일이 있으면(realid) 똑같은 이메일이 있나 확인하고 가입 시키고 끝
      if ('realId' in data) {
        if (data.password !== data.passwordConfirm) {
          return responses.wrondPassword;
        }

        const newUser = await this.users.save(this.users.create({ ...data }));
        const newCode = await this.verifies.save(
          this.verifies.create({ user: newUser }),
        );

        await this.sendMailService.settingMail(newUser.realId, newCode.code);
      }

      return responses.commonTrue;
    } catch (e) {
      console.log(e);
      return responses.commonCatch;
    }
  }

  async login({ realId, password }: LoginDTO): Promise<LoginOutput> {
    const exist = await this.users.findOne(
      { realId },
      { select: ['realId', 'password', 'nickName'] },
    );
    if (!exist) {
      return responses.commonNotFound('계정');
    }

    const passwordCorrect = await exist.checkPassword(password);
    if (!passwordCorrect) {
      return responses.commonNotFound('계정');
    }

    const token = this.jwtService.sign(exist.nickName);

    return {
      ok: true,
      token,
    };
  }

  async verifyEmail(user: Users, { code }: VerifyDTO) {
    const codeCorrect = await this.verifies.findOne(
      { code, user },
      { select: ['id'] },
    );
    if (!codeCorrect) {
      return responses.commonNotFound('인증번호');
    }

    await this.verifies.delete(codeCorrect.id);
    await this.users.update(user.id, { isVerified: verified.verified });
  }

  async checkUserExist(realId: string): Promise<Boolean> {
    const exist = await this.users.confirmUserExist(realId);
    return !!exist;
  }

  async checkNickName(nickName: string): Promise<Boolean> {
    const exist = await this.users.confirmUserNickName(nickName);
    return !!exist;
  }

  async checkSocialId(socialId: string): Promise<Boolean> {
    const exist = await this.users.confirmUserSocial(socialId);
    return !!exist;
  }

  async findUserByNickName(nickName: string): Promise<Users> {
    return this.users.findOne({ nickName });
  }

  me(): boolean {
    return true;
  }
}

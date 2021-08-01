import { EntityRepository, Repository } from 'typeorm';
import { Users } from '../entities/user.entity';

@EntityRepository(Users)
export class UserRepotory extends Repository<Users> {
  async confirmUserExist(realId: string): Promise<Number> {
    return this.count({ realId });
  }

  async confirmUserNickName(nickName: string): Promise<Number> {
    return this.count({ nickName });
  }

  async confirmUserSocial(socialId: string): Promise<Number> {
    return this.count({ socialId });
  }
}

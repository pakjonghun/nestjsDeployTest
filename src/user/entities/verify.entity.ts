import { CommonEntity } from 'src/common/entities/common.entity';
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Users } from './user.entity';
import * as uuid from 'uuid';

@Entity()
export class Verifies extends CommonEntity {
  @Column()
  code: string;

  @OneToOne((type) => Users, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: Users;

  @BeforeInsert()
  insertCode() {
    this.code = uuid.v4();
  }
}

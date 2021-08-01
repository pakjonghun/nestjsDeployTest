import { IsNumber, IsString } from 'class-validator';
import { CommonEntity } from 'src/common/entities/common.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class RegionCodes extends CommonEntity {
  @Column()
  @IsNumber()
  code: number;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsNumber()
  rnum: number;
}

import { IsOptional } from 'class-validator';
import { CommonEntity } from 'src/common/entities/common.entity';
import { Column, Double, Entity } from 'typeorm';

@Entity()
export class Trips extends CommonEntity {
  @Column({ nullable: true })
  @IsOptional()
  addr1?: string;

  @Column({ type: 'bigint', nullable: true })
  @IsOptional()
  areacode?: number;
  @Column({ nullable: true })
  @IsOptional()
  cat1?: string;
  @Column({ nullable: true })
  @IsOptional()
  cat2?: string;
  @Column({ nullable: true })
  @IsOptional()
  cat3?: string;
  @Column({ type: 'bigint', nullable: true })
  @IsOptional()
  contentid?: number;
  @Column({ type: 'bigint', nullable: true })
  @IsOptional()
  contenttypeid?: number;
  @Column({ type: 'bigint', nullable: true })
  @IsOptional()
  createdtime?: number;
  @Column({ nullable: true })
  @IsOptional()
  firstimage?: string;
  @Column({ nullable: true })
  @IsOptional()
  firstimage2?: string;
  @Column({ nullable: true })
  @IsOptional()
  mapx?: string;
  @Column({ nullable: true })
  @IsOptional()
  mapy?: string;
  @Column({ type: 'bigint', nullable: true })
  @IsOptional()
  mlevel?: number;
  @Column({ nullable: true })
  @IsOptional()
  modifiedtime?: string;
  @Column({ nullable: true })
  @IsOptional()
  readcount?: string;
  @Column({ type: 'bigint', nullable: true })
  @IsOptional()
  sigungucode?: number;
  @Column({ nullable: true })
  @IsOptional()
  title?: string;
  @Column({ nullable: true })
  @IsOptional()
  overview?: string;
}

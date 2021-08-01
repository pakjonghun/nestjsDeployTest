import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegionCodes } from './entities/region.entity';
import { Trips } from './entities/trim.entity';
import { TripController } from './trip.controller';
import { TripService } from './trip.service';

@Module({
  imports: [TypeOrmModule.forFeature([RegionCodes, Trips])],
  controllers: [TripController],
  providers: [TripService],
})
export class TripModule {}

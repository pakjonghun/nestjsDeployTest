import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { RegionCodes } from './entities/region.entity';
import { Trips } from './entities/trim.entity';

@Injectable()
export class TripService {
  constructor(
    private readonly configser: ConfigService,
    @InjectRepository(RegionCodes)
    private readonly regionCodes: Repository<RegionCodes>,
    @InjectRepository(Trips)
    private readonly trips: Repository<Trips>,
  ) {}

  private readonly BASE_URL =
    'http://api.visitkorea.or.kr/openapi/service/rest/KorService';
  private readonly api = axios.create({
    baseURL: this.BASE_URL,
    params: {
      serviceKey: decodeURIComponent(this.configser.get('API_KEY')),
      MobileOS: 'ETC',
      MobileApp: 'init',
    },
  });

  async getRegionCodes() {
    const data = await this.api.get('areaCode', {
      params: {
        numOfRows: 30,
      },
    });

    const {
      data: {
        response: {
          body: {
            items: { item },
          },
        },
      },
    } = data;

    for (let i of item) {
      await this.regionCodes.save(this.regionCodes.create({ ...i }));
    }
  }

  async getTrips() {
    const codes = await this.regionCodes.find();

    for (let i of codes) {
      const { code } = i;

      const data = await this.api.get('areaBasedList', {
        params: {
          areaCode: code,
          numOfRows: 20,
          contentTypeId: 25,
        },
      });

      const {
        data: {
          response: {
            body: {
              items: { item },
            },
          },
        },
      } = data;

      for (let j of item) {
        //contentid가 있을경우 반복하지 않도록 코드추가
        const exist = await this.trips.count({ contentid: j.contentId });
        if (exist) {
          continue;
        }
        console.log(j);
        await this.trips.save(this.trips.create({ ...j }));
      }
    }
  }
}

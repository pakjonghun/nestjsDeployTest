import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './user/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { ConfirmUserExist } from './common/middleWares/confirmUserExist';
import { JwtModule } from './jwt/jwt.module';
import { SendMailModule } from './send-mail/send-mail.module';
import { Verifies } from './user/entities/verify.entity';
import { TokenAuthMiddleWare } from './common/middleWares/tokenAuth';
import { TripModule } from './trip/trip.module';
import { RegionCodes } from './trip/entities/region.entity';
import { CommonEntity } from './common/entities/common.entity';
import { Trips } from './trip/entities/trim.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        TOKEN_SECRET: Joi.string().required(),
        MAIL_KEY: Joi.string().required(),
        MY_MAIL: Joi.string().required(),
      }),
    }),
    UserModule,
    CommonModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Users, Verifies, RegionCodes, Trips],
      synchronize: true,
      logging: true,
    }),
    JwtModule,
    SendMailModule,
    TripModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ConfirmUserExist)
      .forRoutes({ path: 'auth/join', method: RequestMethod.POST });

    consumer
      .apply(TokenAuthMiddleWare)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}

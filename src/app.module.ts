import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArithmeticOperationsModule } from './arithmetic-operations/arithmetic-operations.module';
import { AuthModule } from './auth/auth.module';
import { PaywallModule } from './paywall/paywall.module';
import { RecordsModule } from './records/records.module';
import { UsersModule } from './users/users.module';
import registerAs from '../config/db.config';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { User } from './domain/data/user.entity';
import { Record } from './domain/data/record.entity';
import { Operation } from './domain/data/operation.entity';
import { loadOrGetEnv } from 'config/env.config';

@Module({
  imports: [
    loadOrGetEnv(),
    TypeOrmModule.forRoot({
      ...registerAs(),
      entities: [User, Record, Operation],
      migrations: undefined,
    } as unknown as MysqlConnectionOptions),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60 days' },
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    ArithmeticOperationsModule,
    PaywallModule,
    RecordsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArithmeticOperationsModule } from './arithmetic-operations/arithmetic-operations.module';
import { AuthModule } from './auth/auth.module';
import { Operation } from './domain/data/operation.entity';
import { Record } from './domain/data/record.entity';
import { User } from './domain/data/user.entity';
import { UsersModule } from './users/users.module';
import { PaywallModule } from './paywall/paywall.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'changeme',
      database: 'paywall-calculator',
      entities: [User, Record, Operation],
      synchronize: true,
      "logging": true
    }),
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
    PaywallModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

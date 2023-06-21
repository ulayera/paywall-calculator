import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './data/user';
import { Record } from './data/record';
import { Operation } from './data/operation';
import { ArithmeticOperationsController } from './arithmetic-operations/arithmetic-operations.controller';
import { JwtModule } from '@nestjs/jwt';
import { ArithmeticOperationsService } from './arithmetic-operations/arithmetic-operations.service';

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
    UsersModule
  ],
  controllers: [ArithmeticOperationsController],
  providers: [ArithmeticOperationsService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './data/user';
import { Record } from './data/record';
import { Operation } from './data/operation';
import { ArithmeticOperationsController } from './arithmetic-operations/arithmetic-operations.controller';

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
    AuthModule,
    UsersModule
  ],
  controllers: [ArithmeticOperationsController],
  providers: [],
})
export class AppModule {}

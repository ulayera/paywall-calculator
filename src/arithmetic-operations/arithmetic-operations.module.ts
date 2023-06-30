import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../domain/data/user.entity';
import { PaywallModule } from '../paywall/paywall.module';
import { ArithmeticOperationsController } from './arithmetic-operations.controller';
import { ArithmeticOperationsService } from './arithmetic-operations.service';
import { UsersModule } from '../users/users.module';
import { RecordsModule } from '../records/records.module';

@Module({
  imports: [HttpModule, PaywallModule, UsersModule, RecordsModule, TypeOrmModule.forFeature([User])],
  controllers: [ArithmeticOperationsController],
  providers: [ArithmeticOperationsService],
})
export class ArithmeticOperationsModule {}

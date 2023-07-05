import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Operation } from '../domain/data/operation.entity';
import { Record } from '../domain/data/record.entity';
import { User } from '../domain/data/user.entity';
import { BalanceService } from './balance.service';
import { OperationService } from './operation.service';
import { RecordsModule } from '../records/records.module';
import { RecordsService } from '../records/records.service';

@Module({
  imports: [TypeOrmModule.forFeature([Record, User, Operation]), RecordsModule],
  providers: [RecordsService, BalanceService, OperationService],
  exports: [BalanceService, OperationService],
})
export class PaywallModule {}

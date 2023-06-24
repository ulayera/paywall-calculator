import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Operation } from 'src/domain/data/operation.entity';
import { Record } from 'src/domain/data/record.entity';
import { User } from 'src/domain/data/user.entity';
import { BalanceService } from './balance.service';
import { RecordService } from './record.service';
import { OperationService } from './operation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Record, User, Operation]),
  ],
  providers: [RecordService, BalanceService, OperationService],
  exports: [RecordService, BalanceService, OperationService],
})
export class PaywallModule {}

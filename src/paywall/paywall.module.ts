import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { BalanceService } from './balance.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Record } from 'src/domain/data/record.entity';
import { User } from 'src/domain/data/user.entity';
import { Operation } from 'src/domain/data/operation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Record, User, Operation]),
  ],
  providers: [RecordService, BalanceService],
  exports: [RecordService, BalanceService],
})
export class PaywallModule {}

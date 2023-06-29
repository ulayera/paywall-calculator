import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Operation } from 'src/domain/data/operation.entity';
import { Record } from 'src/domain/data/record.entity';
import { User } from 'src/domain/data/user.entity';
import { BalanceService } from './balance.service';
import { OperationService } from './operation.service';
import { RecordsModule } from 'src/records/records.module';
import { RecordsService } from 'src/records/records.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Record, User, Operation]),
    RecordsModule
  ],
  providers: [RecordsService,BalanceService, OperationService],
  exports: [BalanceService, OperationService],
})
export class PaywallModule {}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Operation } from 'src/domain/data/operation.entity';
import { Record } from 'src/domain/data/record.entity';
import { User } from 'src/domain/data/user.entity';
import { OperationType } from 'src/domain/enum/operation-type';
import { Repository } from 'typeorm';
import { OperationService } from './operation.service';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>,
    private readonly operationService: OperationService,
  ) {}

  async log(
    user: User,
    operation: Operation,
    result: number | string,
    currentBalance: number,
  ): Promise<void> {
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    let record: Record = new Record();
    record.user = user;
    record.operation = operation;
    record.operationResponse = result.toString();
    record.amount = operation.cost;
    record.date = new Date();
    record.userBalance = currentBalance - operation.cost;
    record = await this.recordRepository.save(record);

    return Promise.resolve();
  }
}

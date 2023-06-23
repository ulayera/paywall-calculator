import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Operation } from 'src/domain/data/operation.entity';
import { Record } from 'src/domain/data/record.entity';
import { User } from 'src/domain/data/user.entity';
import { OperationType } from 'src/domain/enum/operation-type';
import { Repository } from 'typeorm';
import { BalanceService } from './balance.service';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Operation)
    private readonly operationRepository: Repository<Operation>,
    @InjectRepository(Record) private readonly recordRepository: Repository<Record>,
    private readonly balanceService: BalanceService
  ) {}

  async log(
    username: string,
    operationType: OperationType,
    result: number | string,
  ): Promise<void> {
    const user: User = await this.usersRepository.findOneBy({ username });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const operation: Operation = await this.operationRepository.findOneBy({
      type: operationType,
    });

    let currentBalance = await this.balanceService.getBalance(user);
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

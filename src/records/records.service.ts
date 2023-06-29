import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Operation } from 'src/domain/data/operation.entity';
import { Record } from 'src/domain/data/record.entity';
import { User } from 'src/domain/data/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RecordsService {
  constructor(
    @InjectRepository(Record)
    private readonly recordRepository: Repository<Record>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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

  async getRecordsByUsername(username: string): Promise<Array<Record>> {
    const user = await this.userRepository.findOneBy({ username });
    return this.recordRepository.findBy({ user });
  }
}

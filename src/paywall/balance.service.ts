import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Record } from '../domain/data/record.entity';
import { User } from '../domain/data/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BalanceService {
  constructor(
    @InjectRepository(Record) private recordRepository: Repository<Record>) {}

  async getBalance(user: User): Promise<number> {
    let currentBalance = parseInt(process.env.INITIAL_BALANCE) || 20;
    const lastOperationByUser = await this.recordRepository.findOne({
      order: {
        date: 'DESC',
      },
      where: {
        user: {
          id: user.id,
        },
      },
    });
    if (lastOperationByUser) {
      currentBalance = lastOperationByUser.userBalance;
    }
    return Promise.resolve(currentBalance);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Operation } from '../domain/data/operation.entity';
import { OperationType } from '../domain/enum/operation-type';
import { Repository } from 'typeorm';

@Injectable()
export class OperationService {
  constructor(
    @InjectRepository(Operation)
    private readonly operationRepository: Repository<Operation>,
  ) {}

  getByType(type: OperationType): Promise<Operation> {
    return this.operationRepository.findOneBy({ type });
  } 
}

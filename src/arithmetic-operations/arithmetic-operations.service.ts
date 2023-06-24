import { HttpService } from '@nestjs/axios';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { Operation } from 'src/domain/data/operation.entity';
import { User } from 'src/domain/data/user.entity';
import { MultiOperandDto } from 'src/domain/dto/multi-operand-dto';
import { OperationType } from 'src/domain/enum/operation-type';
import { BalanceService } from 'src/paywall/balance.service';
import { OperationService } from 'src/paywall/operation.service';
import { RecordService } from 'src/paywall/record.service';
import { UsersService } from 'src/users/users.service';
import { ResultDto } from '../domain/dto/result-dto';
import { SingleOperandDto } from '../domain/dto/single-operand-dto';
import { MultiOperandOperations } from '../domain/enum/multi-operand-operations';
import { SingleOperandOperations } from '../domain/enum/single-operand-operations';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ArithmeticOperationsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly recordService: RecordService,
    private readonly balanceService: BalanceService,
    private readonly operationService: OperationService,
    private readonly usersService: UsersService,
  ) {}

  async multiOperandOperation(
    operands: MultiOperandDto,
    operationType: MultiOperandOperations,
    username: string,
  ): Promise<ResultDto> {
    const user: User = await this.usersService.getByUsername(username);
    let reducer: any;
    switch (operationType) {
      case MultiOperandOperations.ADDITION:
        reducer = this.sumReducer;
        break;
      case MultiOperandOperations.SUBTRACTION:
        reducer = this.subtractReducer;
        break;
      case MultiOperandOperations.MULTIPLICATION:
        reducer = this.multiplyReducer;
        break;
      case MultiOperandOperations.DIVISION:
        reducer = this.divideReducer;
        break;
      default:
        throw new Error('Unsupported operation');
    }

    const currentBalance: number = await this.balanceService.getBalance(user);
    const operation: Operation = await this.operationService.getByType(
      operationType as unknown as OperationType,
    );
    if (currentBalance < operation.cost) {
      throw new NotAcceptableException('Insufficient balance');
    }
    const result = {
      value: reducer(operands.values),
      balanceLeft: currentBalance - operation.cost,
    };
    this.recordService.log(user, operation, result.value, currentBalance);
    return result;
  }

  private sumReducer = (array: Array<number>) => array.reduce((a, b) => a + b);
  private subtractReducer = (array: Array<number>) =>
    array.reduce((a, b) => a - b);
  private multiplyReducer = (array: Array<number>) =>
    array.reduce((a, b) => a * b);
  private divideReducer = (array: Array<number>) =>
    array.reduce((a, b) => a / b);

  async singleOperandOperation(
    operand: SingleOperandDto,
    operationType: SingleOperandOperations,
    username: string,
  ): Promise<ResultDto> {
    const user: User = await this.usersService.getByUsername(username);
    let operatorFn: any;
    switch (operationType) {
      case SingleOperandOperations.SQUARE_ROOT:
        operatorFn = this.squareRootFn;
        break;
      case SingleOperandOperations.RANDOM_STRING:
        operatorFn = this.randomStringFn;
        break;
      default:
        throw new Error('Unsupported operation');
    }

    const currentBalance: number = await this.balanceService.getBalance(user);
    const operation: Operation = await this.operationService.getByType(
      operationType as unknown as OperationType,
    );
    if (currentBalance < operation.cost) {
      throw new NotAcceptableException('Insufficient balance');
    }

    const result = {
      value: await operatorFn(operand.value),
    };

    this.recordService.log(user, operation, result.value, currentBalance);
    return result;
  }

  private squareRootFn = (a: number) => Math.sqrt(a);
  private randomStringFn = async (a: number) =>
    await firstValueFrom(
      this.httpService.get(
        `https://www.random.org/strings/?num=1&len=${a}&digits=on&upperalpha=on&loweralpha=on&unique=on&format=plain`,
      ),
    ).then((response) => response.data?.replace(/\n$/, ''));
}

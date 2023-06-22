import { Injectable } from '@nestjs/common';
import { ResultDto } from '../domain/dto/result-dto';
import { MultiOperandOperations } from '../domain/enum/multi-operand-operations';
import { SingleOperandOperations } from '../domain/enum/single-operand-operations';
import { SingleOperandDto } from '../domain/dto/single-operand-dto';
import { MultiOperandDto } from 'src/domain/dto/multi-operand-dto';

@Injectable()
export class ArithmeticOperationsService {
  multiOperandOperation(operands: MultiOperandDto, operation: MultiOperandOperations): ResultDto {
    let reducer: any;
    switch( operation ) {
      case MultiOperandOperations.ADDITION:
        reducer = this.sumReducer; break;
      case MultiOperandOperations.SUBTRACTION:
        reducer = this.subtractReducer; break;
      case MultiOperandOperations.MULTIPLICATION:
        reducer = this.multiplyReducer; break;
      case MultiOperandOperations.DIVISION:
        reducer = this.divideReducer; break;
      default:
        throw new Error('Unsupported operation');
    }
    return {
      value: operands.values.reduce(reducer, 0)
    };
  }

  private sumReducer = (a: number, b: number) => a + b;
  private subtractReducer = (a: number, b: number) => a - b;
  private multiplyReducer = (a: number, b: number) => a * b;
  private divideReducer = (a: number, b: number) => a / b;

  singleOperandOperation(operand: SingleOperandDto, operation: SingleOperandOperations): ResultDto {
    let operatorFn: any;
    switch( operation ) {
      case SingleOperandOperations.SQUARE_ROOT:
        operatorFn = this.squareRootFn; break;
      case SingleOperandOperations.RANDOM_STRING:
        operatorFn = this.randomStringFn; break;
      default:
        throw new Error('Unsupported operation');
    }
    return {
      value: operatorFn(operand)
    };
  }
  private squareRootFn = (a: number) => Math.sqrt(a);
  private randomStringFn = (a: number) => Math.random().toString(36).substring(2, a + 2);
}

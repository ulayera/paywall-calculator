import { Injectable } from '@nestjs/common';
import { ResultDto } from './result-dto';
import { MultiOperandOperations } from './multi-operand-operations';
import { SingleOperandOperations } from './single-operand-operations';
import { SingleOperandDto } from './single-operand-dto';

@Injectable()
export class ArithmeticOperationsService {
  multiOperandOperation(operands: Array<number>, operation: MultiOperandOperations): ResultDto {
    let reducer: any;
    switch( operation ) {
      case MultiOperandOperations.ADD:
        reducer = this.sumReducer; break;
      case MultiOperandOperations.SUBTRACT:
        reducer = this.subtractReducer; break;
      case MultiOperandOperations.MULTIPLY:
        reducer = this.multiplyReducer; break;
      case MultiOperandOperations.DIVIDE:
        reducer = this.divideReducer; break;
      default:
        throw new Error('Unsupported operation');
    }
    return {
      value: operands.reduce(reducer, 0)
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

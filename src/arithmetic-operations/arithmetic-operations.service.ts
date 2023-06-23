import { Injectable } from '@nestjs/common';
import { ResultDto } from '../domain/dto/result-dto';
import { MultiOperandOperations } from '../domain/enum/multi-operand-operations';
import { SingleOperandOperations } from '../domain/enum/single-operand-operations';
import { SingleOperandDto } from '../domain/dto/single-operand-dto';
import { MultiOperandDto } from 'src/domain/dto/multi-operand-dto';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';

@Injectable()
export class ArithmeticOperationsService {
  constructor(private readonly httpService: HttpService) {}

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
      value: reducer(operands.values)
    };
  }

  private sumReducer = (array: Array<number>) => array.reduce((a, b) => a + b);
  private subtractReducer = (array: Array<number>) => array.reduce((a, b) => a - b);
  private multiplyReducer = (array: Array<number>) => array.reduce((a, b) => a * b);
  private divideReducer = (array: Array<number>) => array.reduce((a, b) => a / b);

  async singleOperandOperation(operand: SingleOperandDto, operation: SingleOperandOperations): Promise<ResultDto> {
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
      value: await operatorFn(operand.value)
    };
  }
  
  private squareRootFn = (a: number) => Math.sqrt(a);
  private randomStringFn = async (a: number) => await axios.get(`https://www.random.org/strings/?num=1&len=${a}&digits=on&upperalpha=on&loweralpha=on&unique=on&format=plain`).then(response => response.data?.replace(/\n$/, ""));
}

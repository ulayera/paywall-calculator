import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { SingleOperandDto } from './single-operand-dto';
import { ResultDto } from './result-dto';
import { ArithmeticOperationsService } from './arithmetic-operations.service';
import { MultiOperandOperations } from './multi-operand-operations';
import { SingleOperandOperations } from './single-operand-operations';

@Controller('arithmetic-operations')
export class ArithmeticOperationsController {
  constructor(private readonly arithmeticOperationsService: ArithmeticOperationsService) {}

  @UseGuards(AuthGuard)
  @Post('add')
  async add(@Body() operands: Array<number>): Promise<ResultDto> {
    return this.arithmeticOperationsService.multiOperandOperation(operands, MultiOperandOperations.ADD);
  }

  @UseGuards(AuthGuard)
  @Post('subtract')
  async subtract(@Body() operands: Array<number>): Promise<ResultDto> {
    return this.arithmeticOperationsService.multiOperandOperation(operands, MultiOperandOperations.SUBTRACT);
  }

  @UseGuards(AuthGuard)
  @Post('multiply')
  async multiply(@Body() operands: Array<number>): Promise<ResultDto> {
    return this.arithmeticOperationsService.multiOperandOperation(operands, MultiOperandOperations.MULTIPLY);
  }

  @UseGuards(AuthGuard)
  @Post('divide')
  async divide(@Body() operands: Array<number>): Promise<ResultDto> {
    return this.arithmeticOperationsService.multiOperandOperation(operands, MultiOperandOperations.DIVIDE);
  }

  @UseGuards(AuthGuard)
  @Post('square-root')
  async squareRoot(@Body() operand: SingleOperandDto): Promise<ResultDto> {
    return this.arithmeticOperationsService.singleOperandOperation(operand, SingleOperandOperations.SQUARE_ROOT);
  }

  @UseGuards(AuthGuard)
  @Post('random-string')
  async randomString(@Body() operand: SingleOperandDto): Promise<ResultDto> {
    return this.arithmeticOperationsService.singleOperandOperation(operand, SingleOperandOperations.RANDOM_STRING);
  }
}

import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { SingleOperandDto } from '../domain/dto/single-operand-dto';
import { ResultDto } from '../domain/dto/result-dto';
import { ArithmeticOperationsService } from './arithmetic-operations.service';
import { MultiOperandOperations } from '../domain/enum/multi-operand-operations';
import { SingleOperandOperations } from '../domain/enum/single-operand-operations';
import { MultiOperandDto } from 'src/domain/dto/multi-operand-dto';

@Controller('arithmetic-operations')
export class ArithmeticOperationsController {
  constructor(private readonly arithmeticOperationsService: ArithmeticOperationsService) {}

  @UseGuards(AuthGuard)
  @Post('addition')
  async addition(@Body() operands: MultiOperandDto): Promise<ResultDto> {
    return this.arithmeticOperationsService.multiOperandOperation(operands, MultiOperandOperations.ADDITION);
  }

  @UseGuards(AuthGuard)
  @Post('subtraction')
  async subtraction(@Body() operands: MultiOperandDto): Promise<ResultDto> {
    return this.arithmeticOperationsService.multiOperandOperation(operands, MultiOperandOperations.SUBTRACTION);
  }

  @UseGuards(AuthGuard)
  @Post('multiplication')
  async multiplication(@Body() operands: MultiOperandDto): Promise<ResultDto> {
    return this.arithmeticOperationsService.multiOperandOperation(operands, MultiOperandOperations.MULTIPLICATION);
  }

  @UseGuards(AuthGuard)
  @Post('division')
  async division(@Body() operands: MultiOperandDto): Promise<ResultDto> {
    return this.arithmeticOperationsService.multiOperandOperation(operands, MultiOperandOperations.DIVISION);
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

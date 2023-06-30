import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { MultiOperandDto } from '../domain/dto/multi-operand-dto';
import { ResultDto } from '../domain/dto/result-dto';
import { SingleOperandDto } from '../domain/dto/single-operand-dto';
import { MultiOperandOperations } from '../domain/enum/multi-operand-operations';
import { SingleOperandOperations } from '../domain/enum/single-operand-operations';
import { ArithmeticOperationsService } from './arithmetic-operations.service';

@Controller({
  path: 'arithmetic-operations',
  version: '1',
})
export class ArithmeticOperationsController {
  constructor(
    private readonly arithmeticOperationsService: ArithmeticOperationsService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('addition')
  async addition(@Body() operands: MultiOperandDto, @Request() req): Promise<ResultDto> {
    return await this.arithmeticOperationsService.multiOperandOperation(
      operands,
      MultiOperandOperations.ADDITION,
      req.user?.username,
    );
  }

  @UseGuards(AuthGuard)
  @Post('subtraction')
  async subtraction(@Body() operands: MultiOperandDto, @Request() req): Promise<ResultDto> {
    return await this.arithmeticOperationsService.multiOperandOperation(
      operands,
      MultiOperandOperations.SUBTRACTION,
      req.user?.username,
    );
  }

  @UseGuards(AuthGuard)
  @Post('multiplication')
  async multiplication(@Body() operands: MultiOperandDto, @Request() req): Promise<ResultDto> {
    return await this.arithmeticOperationsService.multiOperandOperation(
      operands,
      MultiOperandOperations.MULTIPLICATION,
      req.user?.username,
    );
  }

  @UseGuards(AuthGuard)
  @Post('division')
  async division(@Body() operands: MultiOperandDto, @Request() req): Promise<ResultDto> {
    return await this.arithmeticOperationsService.multiOperandOperation(
      operands,
      MultiOperandOperations.DIVISION,
      req.user?.username,
    );
  }

  @UseGuards(AuthGuard)
  @Post('square-root')
  async squareRoot(@Body() operand: SingleOperandDto, @Request() req): Promise<ResultDto> {
    return await this.arithmeticOperationsService.singleOperandOperation(
      operand,
      SingleOperandOperations.SQUARE_ROOT,
      req.user?.username,
    );
  }

  @UseGuards(AuthGuard)
  @Post('random-string')
  async randomString(@Body() operand: SingleOperandDto, @Request() req): Promise<ResultDto> {
    return await this.arithmeticOperationsService.singleOperandOperation(
      operand,
      SingleOperandOperations.RANDOM_STRING,
      req.user?.username,
    );
  }
}

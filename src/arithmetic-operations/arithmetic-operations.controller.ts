import { Body, Controller, Post } from '@nestjs/common';

@Controller('arithmetic-operations')
export class ArithmeticOperationsController {
  @Post('add')
  async add(@Body() operands: Array<number>): Promise<string> {
    return JSON.stringify(operands.reduce((a, b) => a + b, 0), null, 2);
  }

  @Post('subtract')
  async subtract(@Body() operands: Array<number>): Promise<string> {
    return JSON.stringify(operands.reduce((a, b) => a - b), null, 2);
  }

  @Post('multiply')
  async multiply(@Body() operands: Array<number>): Promise<string> {
    return JSON.stringify(operands.reduce((a, b) => a * b), null, 2);
  }

  @Post('divide')
  async divide(@Body() operands: Array<number>): Promise<string> {
    return JSON.stringify(operands.reduce((a, b) => a / b), null, 2);
  }

  @Post('square-root')
  async squareRoot(@Body() operand: number): Promise<string> {
    return JSON.stringify(Math.sqrt(operand), null, 2);
  }

  @Post('random-string')
  async randomString(@Body() length: number): Promise<string> {
    return JSON.stringify(Math.random().toString(36).substring(2, length + 2), null, 2);
  }
}

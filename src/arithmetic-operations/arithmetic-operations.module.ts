import { Module } from '@nestjs/common';
import { ArithmeticOperationsController } from './arithmetic-operations.controller';
import { ArithmeticOperationsService } from './arithmetic-operations.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [ArithmeticOperationsController],
  providers: [ArithmeticOperationsService],
})
export class ArithmeticOperationsModule {}

import { Module } from '@nestjs/common';
import { ArithmeticOperationsController } from './arithmetic-operations.controller';
import { ArithmeticOperationsService } from './arithmetic-operations.service';
import { HttpModule } from '@nestjs/axios';
import { PaywallModule } from 'src/paywall/paywall.module';

@Module({
  imports: [HttpModule, PaywallModule],
  controllers: [ArithmeticOperationsController],
  providers: [ArithmeticOperationsService],
})
export class ArithmeticOperationsModule {}

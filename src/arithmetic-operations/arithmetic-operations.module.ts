import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/data/user.entity';
import { PaywallModule } from 'src/paywall/paywall.module';
import { ArithmeticOperationsController } from './arithmetic-operations.controller';
import { ArithmeticOperationsService } from './arithmetic-operations.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [HttpModule, PaywallModule, UsersModule, TypeOrmModule.forFeature([User])],
  controllers: [ArithmeticOperationsController],
  providers: [ArithmeticOperationsService],
})
export class ArithmeticOperationsModule {}

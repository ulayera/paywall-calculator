import { Module } from '@nestjs/common';
import { RecordsController } from './records.controller';
import { RecordsService } from './records.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../domain/data/user.entity';
import { Record } from '../domain/data/record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Record, User])],
  controllers: [RecordsController],
  providers: [RecordsService],
  exports: [RecordsService],
})
export class RecordsModule {}

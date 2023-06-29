import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Record } from 'src/domain/data/record.entity';
import { RecordsService } from './records.service';

@Controller({
  path: 'records',
  version: '1',
})
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getRecords(@Request() req): Promise<Array<Record>> {
    return await this.recordsService.getRecordsByUsername(req.user?.username);
  }
}

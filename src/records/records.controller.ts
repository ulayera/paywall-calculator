import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { Record } from '../domain/data/record.entity';
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
    const records = await this.recordsService.getRecordsByUsername(
      req.user?.username,
    );
    return records.map(
      (record) =>
        ({ ...record, operation: record.operation?.type } as unknown as Record),
    );
  }
}

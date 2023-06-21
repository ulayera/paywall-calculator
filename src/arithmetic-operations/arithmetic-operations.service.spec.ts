import { Test, TestingModule } from '@nestjs/testing';
import { ArithmeticOperationsService } from './arithmetic-operations.service';

describe('ArithmeticOperationsService', () => {
  let service: ArithmeticOperationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArithmeticOperationsService],
    }).compile();

    service = module.get<ArithmeticOperationsService>(ArithmeticOperationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

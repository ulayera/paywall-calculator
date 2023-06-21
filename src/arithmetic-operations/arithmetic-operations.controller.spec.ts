import { Test, TestingModule } from '@nestjs/testing';
import { ArithmeticOperationsController } from './arithmetic-operations.controller';

describe('ArithmeticOperationsController', () => {
  let controller: ArithmeticOperationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArithmeticOperationsController],
    }).compile();

    controller = module.get<ArithmeticOperationsController>(ArithmeticOperationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

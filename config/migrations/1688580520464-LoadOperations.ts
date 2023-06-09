/* eslint-disable @typescript-eslint/no-empty-function */
import { Operation } from '../../src/domain/data/operation.entity';
import { OperationType } from '../../src/domain/enum/operation-type';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class LoadOperations1688580520464 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.connection
      .createQueryBuilder()
      .insert()
      .into(Operation)
      .values([
        { type: OperationType.ADDITION, cost: 1 },
        { type: OperationType.SUBTRACTION, cost: 1 },
        { type: OperationType.MULTIPLICATION, cost: 1 },
        { type: OperationType.DIVISION, cost: 1 },
        { type: OperationType.SQUARE_ROOT, cost: 1 },
        { type: OperationType.RANDOM_STRING, cost: 1 },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

/* eslint-disable @typescript-eslint/no-empty-function */
import { User } from '../../src/domain/data/user.entity';
import { UserStatus } from '../../src/domain/enum/user-status';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class LoadUser1687464601412 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          username: 'user',
          password: 'pass',
          status: UserStatus.ACTIVE,
        },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

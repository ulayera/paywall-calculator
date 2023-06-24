import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OperationType } from '../enum/operation-type';

@Entity()
export class Operation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: OperationType;

  @Column()
  cost: number;
}

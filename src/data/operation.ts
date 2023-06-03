import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { OperationType } from './operation-type';

@Entity()
export class Operation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: OperationType;

  @Column()
  cost: number;
}

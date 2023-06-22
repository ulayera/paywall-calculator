import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Operation } from './operation.entity';
import { type } from 'os';
import { User } from './user.entity';

@Entity()
export class Record {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => Operation, operation => operation.id)
  operation: Operation;

  @OneToOne(type => User, user => user.id)
  user: User;

  @Column()
  amount: number;

  @Column()
  userBalance: number;

  @Column()
  operationresponse: string;

  @Column()
  date: Date;
}

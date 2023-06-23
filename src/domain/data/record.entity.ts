import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Operation } from './operation.entity';
import { type } from 'os';
import { User } from './user.entity';

@Entity()
export class Record {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => Operation, operation => operation.id)
  @JoinColumn({ name: 'operation_id' })
  operation: Operation;

  @OneToOne(type => User, user => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  amount: number;

  @Column()
  userBalance: number;

  @Column()
  operationResponse: string;

  @Column()
  date: Date;
}

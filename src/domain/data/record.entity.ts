import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Operation } from './operation.entity';
import { User } from './user.entity';

@Entity()
export class Record {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Operation, (operation) => operation.id)
  @JoinColumn({ name: 'operation_id' })
  operation: Operation;

  @ManyToOne(() => User, (user) => user.id)
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

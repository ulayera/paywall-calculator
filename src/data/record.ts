import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Record {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  operationId: number;

  @Column()
  userId: number;

  @Column()
  amount: number;

  @Column()
  userBalance: number;

  @Column()
  operationresponse: string;

  @Column()
  date: Date;
}

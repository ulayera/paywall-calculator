import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserStatus } from './user-status';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  status: UserStatus;
}

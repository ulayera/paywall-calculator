import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserStatus } from '../enum/user-status';

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

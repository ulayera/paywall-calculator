import { registerAs } from '@nestjs/config';
import { loadOrGetEnv } from './env.config';
import { User } from 'src/domain/data/user.entity';
import { Record } from 'src/domain/data/record.entity';
import { Operation } from 'src/domain/data/operation.entity';

loadOrGetEnv();

export default registerAs('database', () => {
  return {
    name: 'default',
    type: 'mysql',
    logging: true,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    // synchronize: process.env.MODE === "dev",
    entities: [User, Record, Operation],
    migrations: ['config/migrations/*.ts'],
  };
});

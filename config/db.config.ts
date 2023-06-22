import { ConfigModule, registerAs } from '@nestjs/config';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: '.env',
});

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
    entities: ['src/domain/**/*.entity.{ts,js}'],
    migrations: ['config/migrations/*.ts'],
  };
});

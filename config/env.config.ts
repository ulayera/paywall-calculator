import { DynamicModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

let configModule: DynamicModule;

export function loadOrGetEnv() {
  if (!configModule) {
    const env = process.env.NODE_ENV || 'development';
    const dotenv = env === 'development' ? '.env' : `.env.${env}`;
    console.log(`Loading ${env} configuration from ${dotenv}`);
    configModule = ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [dotenv],
    });
  }
  return configModule;
}

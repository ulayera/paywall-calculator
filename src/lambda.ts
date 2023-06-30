import { Handler, Context } from 'aws-lambda';
import { Server } from 'http';
import { createServer, proxy } from 'aws-serverless-express';
import { eventContext } from 'aws-serverless-express/middleware';
import 'source-map-support/register';

import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';

const binaryMimeTypes: string[] = [];

let cachedServer: Server;

process.on('unhandledRejection', (reason) => {
  console.error(reason);
});

process.on('uncaughtException', (reason) => {
  console.error(reason);
});

async function bootstrapServer(): Promise<Server> {
  console.log('Bootstraping server...', cachedServer);
  if (!cachedServer) {
    try {
      const expressApp = require('express')();
      const adapter = new ExpressAdapter(expressApp);
      console.log('Creating Express app...');
      const app = await NestFactory.create(AppModule, adapter);
      console.log('Created Express app...');
      app.enableVersioning({
        type: VersioningType.URI,
      });
      app.use(eventContext());
      await app.init();
      cachedServer = createServer(expressApp, undefined, binaryMimeTypes);
    }
    catch (error) {
      return Promise.reject(error);
    }
  }
  return Promise.resolve(cachedServer);
}

export const handler: Handler = async (event: any, context: Context) => {
  cachedServer = await bootstrapServer();
  console.log('Calling handler...', !!cachedServer);
  return proxy(cachedServer, event, context, 'PROMISE').promise;
}
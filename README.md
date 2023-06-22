## Paywall calculator

A [NestJS](https://github.com/nestjs/nest) app that allows users to make paid arithmetic operations by showcasing some of the most common needs of a REST API

## Installation

```bash
$ npm install
```

## Database setup

```bash
$ docker run -d --name paywall-calculator-db -p 3306:3306 -e MYSQL_ROOT_PASSWORD=changeme mysql
$ docker run -d --name paywall-calculator-db -p 3306:3306 -e MYSQL_ROOT_PASSWORD=changeme arm64v8/mysql
```

## Database init

```bash
$ npm run typeorm -- migration:run -d config/migration.config.ts
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

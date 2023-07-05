## Paywall calculator

A [NestJS](https://github.com/nestjs/nest) app that allows users to make paid arithmetic operations by showcasing some of the most common needs of a REST API

## Installation

```bash
$ npm install
$ cp example.env .env
# check the values in .env
```

## Database setup

```bash
$ docker run -d --name paywall-calculator-db -p 3306:3306 -e MYSQL_ROOT_PASSWORD=changeme mysql
$ docker run -d --name paywall-calculator-db -p 3306:3306 -e MYSQL_ROOT_PASSWORD=changeme arm64v8/mysql
```

## Database init

```bash
// initialize schema
$ npm run orm:sync
// initialize data
$ npm run orm:migration
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

Didn't have enough time to invest on this so I just tested one file as a showcase of how to test under the nestjs DI

```bash
# unit tests
$ npm test -- src/auth/auth.guard.spec.ts

# test coverage
$ npm run test:cov
```

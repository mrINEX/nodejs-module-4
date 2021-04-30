import 'reflect-metadata';
import http from 'http';
import { createConnection } from 'typeorm';

import config from './config/index';
import { app } from './app';

const { PORT } = config;

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);

  createConnection()
    .then(() => console.log('Connection is created to PostgreSQL.'))
    .catch((error) => console.log('Cannot connect: ', error));
});

process.on('unhandledRejection', (reason) => {
  console.log(`Unhandled Rejection: ${reason}`);
});

process.on('uncaughtException', (err) => {
  console.log(`Uncaught Exception: ${err.message}`);
});

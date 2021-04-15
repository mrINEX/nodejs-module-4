import 'reflect-metadata';
import http from 'http';
import { createConnection } from 'typeorm';

import config from './config/index';
import { app } from './app';

const { PORT, typeORM } = config;

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);

  createConnection(typeORM)
    .then(() => console.log('Connection is created to PostgreSQL.'))
    .catch((error) => console.log("Cannot connect: ", error));
});

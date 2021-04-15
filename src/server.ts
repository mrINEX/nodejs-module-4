import 'reflect-metadata';
import http from 'http';
import { createConnection, QueryRunner } from 'typeorm';

import config from './config/index';
import { app } from './app';
import { User } from './users/user.model';
import randomInteger from './users/utils/random-int';

const { PORT, typeORM } = config;

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
  
  createConnection(typeORM)
    .then(async (connection) => {
      const queryRunner: QueryRunner = connection.createQueryRunner();
      await queryRunner.connect();
      
      await queryRunner.dropTable("user");
      await connection.synchronize();
      console.log('Connection is created to PostgreSQL.');
      
      queryRunner.startTransaction();
      
      const users = Array(20).fill('data').map((val, index) => {
        return queryRunner.manager.create(User, {
          login: `login${index}`,
          password: `${val}${index}`,
          age: randomInteger(3, 130)
        });
      })
      
      try {
        await queryRunner.manager.save(users);
        await queryRunner.commitTransaction();
      } catch (err) {
        await queryRunner.rollbackTransaction();
      }
    })
    .catch((error) => console.log("Cannot connect: ", error));
});

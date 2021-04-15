import dotenv from 'dotenv';

dotenv.config();

const config = {
  PORT: process.env.PORT as string,
  typeORM: {
    type: process.env.TYPEORM_TYPE as 'postgres',
    host: process.env.TYPEORM_HOST as string,
    port: +process.env.TYPEORM_PORT as number,
    username: process.env.TYPEORM_USERNAME as string,
    password: process.env.TYPEORM_PASSWORD as string,
    database: process.env.TYPEORM_DATABASE as string,
    entities: [process.env.TYPEORM_ENTITIES as string],
    synchronize: (process.env.TYPEORM_SYNCHRONIZE === 'true') as boolean,
    migrations: [process.env.TYPEORM_MIGRATIONS as string],
  },
  typeORMwithURL: {
    type: process.env.TYPEORM_TYPE as 'postgres',
    url: process.env.TYPEORM_URL as string,
    entities: [process.env.TYPEORM_ENTITIES as string],
    synchronize: (process.env.TYPEORM_SYNCHRONIZE === 'true') as boolean,
  }
}

export default config

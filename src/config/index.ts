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
    entities: [process.env.TYPEORM_Entities as string],
    synchronize: !!process.env.TYPEORM_Synchronize as boolean,
    // dropSchema: !!process.env.TYPEORM_DropSchema as boolean
  },
  typeORMwithURL: {
    type: process.env.TYPEORM_TYPE as 'postgres',
    url: process.env.TYPEORM_URL as string,
    entities: [process.env.TYPEORM_Entities as string],
    synchronize: !!process.env.TYPEORM_Synchronize as boolean,
    // dropSchema: !!process.env.TYPEORM_DropSchema as boolean
  }
}

export default config

import dotenv from 'dotenv';

dotenv.config();

const config = {
  PORT: process.env.PORT as string,
  typeORMwithURL: {
    type: process.env.TYPEORM_TYPE as 'postgres',
    url: process.env.TYPEORM_URL as string,
    entities: [process.env.TYPEORM_ENTITIES as string],
    synchronize: (process.env.TYPEORM_SYNCHRONIZE === 'true') as boolean,
  },
};

export default config;

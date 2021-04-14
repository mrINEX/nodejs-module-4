import dotenv from 'dotenv';

dotenv.config();

const config = {
  PORT: process.env.PORT as string,
  typeORM: {
    type: process.env.elephantsqlTYPE as 'postgres',
    host: process.env.elephantsqlHOST as string,
    port: +process.env.elephantsqlPORT as number,
    username: process.env.elephantsqlUSERNAME as string,
    password: process.env.elephantsqlPASSWORD as string,
    database: process.env.elephantsqlDATABASE as string,
    entities: [process.env.elephantsqlEntities as string],
    synchronize: !!process.env.elephantsqlSynchronize as boolean,
  },
  typeORMwithURL: {
    type: process.env.elephantsqlTYPE as 'postgres',
    url: process.env.elephantsqlURL as string,
    entities: [process.env.elephantsqlEntities as string],
    synchronize: !!process.env.elephantsqlSynchronize as boolean,
  }
}

export default config

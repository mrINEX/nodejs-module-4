import { Express } from 'express';
import dotenv from 'dotenv';

dotenv.config();

function server(app: Express): void {
  app.listen(process.env.PORT, () =>
    console.log(`App is running on http://localhost:${process.env.PORT}`)
  );
}

export default server;

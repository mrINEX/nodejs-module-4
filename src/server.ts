import { Express } from 'express';
import http from 'http';
import dotenv from 'dotenv';

dotenv.config();

function runServer(app: Express): void {
  const { PORT } = process.env;

  const server = http.createServer(app);
  server.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`)
  });
}

export default runServer;

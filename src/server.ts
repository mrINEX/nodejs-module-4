import http from 'http';
import dotenv from 'dotenv';

import { app } from './app';

dotenv.config();

const { PORT } = process.env;

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});

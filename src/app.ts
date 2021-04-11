import express from 'express';
import cors from 'cors';

import registerModule from './users/index';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

registerModule(app, '/users');

export { app };

import express from 'express';
import cors from 'cors'

import runServer from './server';
import { router as userRouter } from './users/user.router';

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

app.use('/users', userRouter);

runServer(app);

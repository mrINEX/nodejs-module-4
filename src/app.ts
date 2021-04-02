import express from 'express';
import server from './server';
import { router as userRouter } from './resources/users/user.router';

const app = express();

app.use(express.json());

app.use('/users', userRouter);

server(app);

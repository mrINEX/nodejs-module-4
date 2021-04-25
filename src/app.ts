import express from 'express';
import cors from 'cors';

import registerUserModule from './modules/users/index';
import registerGroupModule from './modules/groups/index';

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

registerUserModule(app, '/users');
registerGroupModule(app, '/groups');

export { app };

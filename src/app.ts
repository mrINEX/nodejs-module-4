import express from 'express';
import cors from 'cors';

import registerLoginModule from './modules/login';
import registerUserModule from './modules/users';
import registerGroupModule from './modules/groups';
import registerUsersToGroupMiddleware from './modules/users_id_group_id';

import { checkToken } from './modules/login/middleware';
import { logHandling } from './common/log_handling';
import { unhandledErrorsHandling, nonExistentRoutesHandling } from './common/error_handling';

const app = express();

app.use(cors());
app.use(express.json());
app.use(logHandling);

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

registerLoginModule(app, '/login');
app.use(checkToken);
registerUserModule(app, '/users');
registerGroupModule(app, '/groups');
registerUsersToGroupMiddleware(app, '/users/:userId/groups/:groupId');

app.all('*', nonExistentRoutesHandling);

app.use(unhandledErrorsHandling);

export { app };

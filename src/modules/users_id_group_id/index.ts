import { Application } from 'express';
import { addUsersToGroupMiddleware } from './add_users_to_group.controllers';

function registerModule(app: Application, url: string): void {
  app.use(url, addUsersToGroupMiddleware);
}

export default registerModule;

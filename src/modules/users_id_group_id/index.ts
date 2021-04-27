import { Application } from 'express';

import { addUsersToGroupMiddleware } from './add_users_to_group.controllers';
import { errorHandling } from '../../common/error_handling';

function registerModule(app: Application, url: string): void {
  app.use(url, errorHandling(addUsersToGroupMiddleware));
}

export default registerModule;

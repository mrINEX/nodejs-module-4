import { Application } from 'express';
import { router } from './user.router';

function registerModule(app: Application, url: string): void {
  app.use(url, router);
}

export default registerModule;

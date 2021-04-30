import { Request, Response, NextFunction } from 'express';
import { logger } from './winston';

export const logHandling = (req: Request, res: Response, next: NextFunction): void => {
  const { path, method, query, body } = req; // headers
  const log = `${JSON.stringify({ path, method, query, body }, null, 2)}`;

  logger.info(log);

  next();
};

import { NextFunction, Request, Response } from 'express';

import { createPerformanceObserver } from './performance';
import { logger } from './winston';

export type InputFunction = (req: Request, res: Response) => Promise<void>;
type OutputFunction = (req: Request, res: Response, next: NextFunction) => Promise<void>;

function getMainArguments(req: Request) {
  const { path, method, query, body, headers } = req;
  return JSON.stringify({ path, method, query, body, headers }, null, 2);
}

export function errorHandling(fn: InputFunction): OutputFunction {
  const fnWithPerformanceObserver = createPerformanceObserver(fn);

  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await fnWithPerformanceObserver(req, res);
    } catch (err) {
      logger.warn(`method name: ${fn.name}`);
      logger.warn(`arguments passed to the method: ${getMainArguments(req)}`);
      logger.warn(`error message: ${err.message}`);

      next(err);
    }
  };
}

export function nonExistentRoutesHandling(req: Request, res: Response): void {
  const route = `Can't find path '${req.originalUrl}' on this server`;

  res.status(404).json({ route });
}

export function unhandledErrorsHandling(err: Error, req: Request, res: Response, next: NextFunction): void {
  logger.error(`[ ERROR ] ${err.message}`);

  res.status(500).json({ message: 'Internal Server Error' });
  next();
}

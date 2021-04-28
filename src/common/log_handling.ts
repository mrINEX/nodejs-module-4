import { Request, Response, NextFunction } from 'express';

export const logHandling = (req: Request, res: Response, next: NextFunction): void => {
  const { path, method, query, body, headers } = req;
  const log = `logging: ${JSON.stringify({ path, method, query, body, headers }, null, 2)}`;

  console.log(log);

  next();
};

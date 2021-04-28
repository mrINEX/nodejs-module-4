import { Request, Response, NextFunction } from 'express';

export const logHandling = (req: Request, res: Response, next: NextFunction): void => {
  const { path, method, query, body } = req; // headers
  const log = `logging: ${JSON.stringify({ path, method, query, body }, null, 2)}`;

  console.log(log);

  next();
};

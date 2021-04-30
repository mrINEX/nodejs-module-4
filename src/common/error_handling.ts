import { NextFunction, Request, Response } from 'express';

type InputFunction = (req: Request, res: Response) => Promise<void>;

function getMainArguments(req: Request) {
  const { path, method, query, body, headers } = req;
  return JSON.stringify({ path, method, query, body, headers }, null, 2);
}

export function errorHandling(fn: InputFunction) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await fn(req, res);
    } catch (err) {
      console.log('method name:', fn.name);
      console.log('arguments passed to the method:', `${getMainArguments(req)}`);
      console.log('error message:', err.message);

      next(err);
    }
  };
}

export function unhandledErrorsHandling(err: Error, req: Request, res: Response, next: NextFunction): void {
  console.log(`ERROR: ${err.message}`);

  res.status(500).json({ message: 'Internal Server Error' });
  next();
}

export function nonExistentRoutesHandling(req: Request, res: Response): void {
  const route = `Can't find path '${req.originalUrl}' on this server`;

  res.status(404).json({ route });
}

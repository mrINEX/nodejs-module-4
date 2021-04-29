import { Request, Response } from 'express';

type InputFunction = (req: Request, res: Response) => Promise<void>;

function getMainArguments(req: Request, res: Response) {
  return JSON.stringify({ req, res }, null, 2);
}

export function errorHandling(fn: InputFunction) {
  return async (req: Request, res: Response): Promise<void> => {
    try {
      await fn(req, res);
    } catch (error) {
      console.log('method name:', fn.name);
      console.log('arguments passed to the method:', `${getMainArguments(req, res)}`);
      console.log('error message:', error.message);

      throw error;
    }
  };
}

export function unhandledErrorsHandling(err: Error, req: Request, res: Response): void {
  const unhandled = 'Internal Server Error';
  const { message } = err;

  res.status(500).json({ unhandled, message });
}

export function nonExistentRoutesHandling(req: Request, res: Response): void {
  const route = `Can't find path '${req.originalUrl}' on this server`;

  res.status(404).json({ route });
}

import { Request, Response } from 'express';

type InputFunction = (req: Request, res: Response) => Promise<void>;

function getMainArguments(req: Request) {
  const { body, params, query } = req;
  return JSON.stringify({ body, params, query }, null, 2);
}

export function errorHandling(fn: InputFunction) {
  return async (req: Request, res: Response): Promise<void> => {
    try {
      await fn(req, res);
    } catch (error) {
      console.log('method name:', fn.name);
      console.log('arguments passed to the method:', `${getMainArguments(req)}`);
      console.log('error message:', error.message);
    }
  };
}

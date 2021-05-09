import { Request, Response } from 'express';
import * as loginService from './login.service';

export const postMethodHandler = async (req: Request, res: Response): Promise<void> => {
  const { login, password } = req.body as { login: string; password: string };

  const token = await loginService.login(login, password);

  if (token) {
    res.json({ token });
  } else {
    res.status(403).json({ message: 'Bad login/password combination.' });
  }
};

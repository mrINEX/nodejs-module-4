import * as usersService from './user.service';
import { Request, Response } from 'express';
import { InputUser, IdUser, IGetAutoSuggest } from './user.model';

export const postMethodHandler = async (req: Request, res: Response): Promise<void> => {
  const { login, password, age } = req.body as InputUser;

  const user = await usersService.create({ login, password, age });

  if (user) {
    res.json(user);
  } else {
    res.status(400).json({ message: `User with this "${login}" login exist` });
  }
};

export const getMethodHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params as IdUser;

  const user = await usersService.get(id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

export const getAllMethodHandler = async (req: Request, res: Response): Promise<void> => {
  const { loginSubstring, limit } = req.query as IGetAutoSuggest;

  const users = await usersService.getAll(loginSubstring as string, +limit as number);

  res.json({ users });
};

export const putMethodHandler = async (req: Request, res: Response): Promise<void> => {
  const { login, password, age } = req.body as InputUser;
  const { id } = req.params as IdUser;

  const affected = await usersService.update(id, { login, password, age });

  if (affected) {
    res.json({ affected });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

export const deleteMethodHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params as IdUser;

  const user = await usersService.remove(id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

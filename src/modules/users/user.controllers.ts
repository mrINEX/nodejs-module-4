import * as usersService from './user.service';
import { Request, Response } from 'express';

export const postMethodHandler = async (req: Request, res: Response): Promise<void> => {
  const { login, password, age } = req.body;

  const user = await usersService.create({ login, password, age });

  if (user) {
    res.json({ user });
  } else {
    res.status(403).json({ user, message: `User with this "${login}" login exist` });
  }
};

export const getMethodHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const user = await usersService.get(id);

  if (user) {
    res.json({ user });
  } else {
    res.status(404).json({ user });
  }
};

export const getAllMethodHandler = async (req: Request, res: Response): Promise<void> => {
  const { loginSubstring, limit } = req.query;

  const users = await usersService.getAll(loginSubstring as string, +limit as number);

  res.json({ users });
};

export const putMethodHandler = async (req: Request, res: Response): Promise<void> => {
  const { login, password, age } = req.body;
  const { id } = req.params;

  const affected = await usersService.update(id, { login, password, age });

  res.json({ affected });
};

export const deleteMethodHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const user = await usersService.remove(id);

  if (user) {
    res.json({ user });
  } else {
    res.status(404).json({ user });
  }
};

import * as usersService from './user.service';
import { User } from './user.model';
import { Request, Response } from 'express';

export const postMethodHandler = async (req: Request, res: Response): Promise<void> => {
  const { login, password, age } = req.body;

  const user = await usersService.create({ login, password, age });
  
  res.json({ user });
};

export const getMethodHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const user = await usersService.get(id);

  res.json({ user });
};

export const getAllMethodHandler = async (req: Request, res: Response): Promise<void> => {
  const { loginSubstring, limit } = req.query;

  const users = await usersService.getAll(loginSubstring as string, +limit as number);

  res.json({ users });
};

export const putMethodHandler = async (req: Request, res: Response): Promise<void> => {
  const { login, password, age } = req.body;
  const { id } = req.params;

  const user = await User.find();

  res.status(200).send({ user });
};

export const deleteMethodHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const user = await User.find();

  res.status(200).send({ user });
};

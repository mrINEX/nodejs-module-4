import * as usersService from './user.service';
import { User, OutputUser } from './user.model';
import { Request, Response } from 'express';

export const postMethodHandler = async (req: Request, res: Response): Promise<void> => {
  const { login, password, age } = req.body;

  const post: {
    isCreated: boolean, status?: number, message?: Array<string>
  } = await usersService.create(
    { login, password, age }
  );

  if (post.isCreated) {
    res.sendStatus(200);
  } else {
    res.status(post.status).send({ message: post.message });
  }
};

export const getMethodHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const user: OutputUser | undefined = await usersService.get(id);

  if (user) {
    res.json(User.toResponse(user));
  } else {
    res.sendStatus(404);
  }
};

export const getAllMethodHandler = async (req: Request, res: Response): Promise<void> => {
  const { loginSubstring, limit } = req.query;

  const users: OutputUser[] = await usersService.getAll(
    loginSubstring as string,
    Number.isNaN(Number(limit)) ? undefined : Number(limit)
  );

  res.json(users.map(User.toResponse));
};

export const putMethodHandler = async (req: Request, res: Response): Promise<void> => {
  const { login, password, age } = req.body;
  const { id } = req.params;

  const put: { isUpdated: boolean, message?: Array<string> } = await usersService.update(
    id,
    { login, password, age }
  );

  if (put.message) {
    res.status(400).send({ message: put.message });
  } else {
    if (put.isUpdated) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  }
};

export const deleteMethodHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const isDeleted: boolean = await usersService.remove(id);

  if (isDeleted) {
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
};

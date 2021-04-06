import * as usersService from '../user.service';
import { User, OutputUser } from '../user.model';
import { Request, Response } from 'express';

const postMethodHandler = async (req: Request, res: Response): Promise<void> => {
  const { login, password, age } = req.body;

  const user: OutputUser | undefined = await usersService.create(
    new User({ login, password, age })
  );

  if (user) {
    res.sendStatus(200);
  } else {
    res.sendStatus(403);
  }
}

const getMethodHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const user: OutputUser | undefined = await usersService.get(id);

  if (user) {
    res.json(User.toResponse(user));
  } else {
    res.sendStatus(404);
  }
}

const getAllMethodHandler = async (req: Request, res: Response): Promise<void> => {
  const { loginSubstring, limit } = req.query;

  const users: OutputUser[] = await usersService.getAll(
    loginSubstring as string,
    Number.isNaN(Number(limit)) ? undefined : Number(limit)
  );

  res.json(users.map(User.toResponse));
}

const putMethodHandler = async (req: Request, res: Response): Promise<void> => {
  const { login, password, age } = req.body;
  const { id } = req.params;

  const isUpdated: boolean = await usersService.update(id, { login, password, age });

  if (isUpdated) {
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
}

const deleteMethodHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const isDeleted: boolean = await usersService.remove(id);

  if (isDeleted) {
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
}

export {
  postMethodHandler, getMethodHandler,
  getAllMethodHandler, putMethodHandler,
  deleteMethodHandler
};

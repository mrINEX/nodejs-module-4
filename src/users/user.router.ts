import { Router } from 'express';
import * as usersService from './user.service';
import { User, OutputUser } from './user.model';

const router = Router();

router.route('/').post(async (req, res) => {
  const { login, password, age } = req.body;

  const post: { isCreated: boolean, message?: string} = await usersService.create(
    { login, password, age }
  );

  if (post.isCreated) {
    res.sendStatus(200);
  } else {
    res.status(400).send({ message: post.message });
  }
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;

  const user: OutputUser | undefined = await usersService.get(id);

  if (user) {
    res.json(User.toResponse(user));
  } else {
    res.sendStatus(404);
  }
});

router.route('/').get(async (req, res) => {
  const { loginSubstring, limit } = req.query;

  const users: OutputUser[] = await usersService.getAll(
    loginSubstring as string,
    Number.isNaN(Number(limit)) ? undefined : Number(limit)
  );

  res.json(users.map(User.toResponse));
});

router.route('/:id').put(async (req, res) => {
  const { login, password, age } = req.body;
  const { id } = req.params;

  const put: { isUpdated: boolean, message?: string } = await usersService.update(
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
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;

  const isDeleted: boolean = await usersService.remove(id);

  if (isDeleted) {
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

export { router };

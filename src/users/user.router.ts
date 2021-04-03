import { Router } from 'express';
import * as usersService from './user.service';
import { User, OutputUser } from './user.model';

const router = Router();

router.route('/').post(async (req, res) => {
  const { login, password, age } = req.body;

  const user: OutputUser = await usersService.create(
    new User({ login, password, age })
  );

  res.json(User.toResponse(user));
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;

  const user = await usersService.get(id);

  res.json(User.toResponse(user));
});

router.route('/').get(async (req, res) => {
  const { loginSubstring, limit } = req.query;

  const users = await usersService.getAll(loginSubstring as string, Number(limit));

  res.json(users.map(User.toResponse));
});

export { router };

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

  const users = await usersService.getAll(
    loginSubstring as string,
    Number.isNaN(Number(limit)) ? undefined : Number(limit)
  );

  res.json(users.map(User.toResponse));
});

router.route('/:id').put(async (req, res) => {
  const { login, password, age } = req.body;
  const { id } = req.params;

  const user = await usersService.update(id, { login, password, age });

  res.json(User.toResponse(user));
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;

  const isDeleted = await usersService.remove(id);

  res.json({
    result: isDeleted,
    message: `User with ${id} id has${isDeleted ? '' : ' not'} been deleted`
  });
})

export { router };

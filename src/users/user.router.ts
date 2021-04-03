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

export { router };

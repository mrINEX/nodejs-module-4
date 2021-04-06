import { Router } from 'express';
import {
  postMethodHandler, getMethodHandler,
  getAllMethodHandler, putMethodHandler,
  deleteMethodHandler
} from './methods-handlers/methods-handler';

const router = Router();

router.route('/').post(postMethodHandler);

router.route('/:id').get(getMethodHandler);

router.route('/').get(getAllMethodHandler);

router.route('/:id').put(putMethodHandler);

router.route('/:id').delete(deleteMethodHandler);

export { router };

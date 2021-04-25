import { Router } from 'express';
import * as api from './group.controllers';

const router = Router();

router.route('/').post(api.postMethodHandler);
router.route('/:id').get(api.getMethodHandler);
router.route('/').get(api.getAllMethodHandler);
router.route('/:id').put(api.putMethodHandler);
router.route('/:id').delete(api.deleteMethodHandler);

export { router };

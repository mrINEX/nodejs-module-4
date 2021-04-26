import { Router } from 'express';
import * as api from './group.controllers';
import { schemaInputGroup, validate } from './utils/validate-and-schemas';

const router = Router();

router.route('/').post(validate(schemaInputGroup), api.postMethodHandler);
router.route('/:id').get(api.getMethodHandler);
router.route('/').get(api.getAllMethodHandler);
router.route('/:id').put(validate(schemaInputGroup), api.putMethodHandler);
router.route('/:id').delete(api.deleteMethodHandler);

export { router };

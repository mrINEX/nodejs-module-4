import { Router } from 'express';

import * as api from './group.controllers';
import { schemaInputGroup, validate } from './utils/validate-and-schemas';
import { errorHandling } from '../../common/error_handling';

const router = Router();

router.route('/').post(validate(schemaInputGroup), errorHandling(api.postMethodHandler));
router.route('/:id').get(errorHandling(api.getMethodHandler));
router.route('/').get(errorHandling(api.getAllMethodHandler));
router.route('/:id').put(validate(schemaInputGroup), errorHandling(api.putMethodHandler));
router.route('/:id').delete(errorHandling(api.deleteMethodHandler));

export { router };

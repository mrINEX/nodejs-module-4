import { Router } from 'express';
import { schemaGetAutoSuggest, schemaInputUser, validateBody, validateQuery } from './utils/validate-schema';
import * as api from './user.controllers';

const router = Router();

router.route('/').post(validateBody(schemaInputUser), api.postMethodHandler);
router.route('/:id').get(api.getMethodHandler);
router.route('/').get(validateQuery(schemaGetAutoSuggest), api.getAllMethodHandler);
router.route('/:id').put(api.putMethodHandler);
router.route('/:id').delete(api.deleteMethodHandler);

export { router };

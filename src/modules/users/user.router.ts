import { Router } from 'express';

import { schemaGetAutoSuggest, schemaInputUser, validateBody, validateQuery } from './utils/validate-and-schemas';
import * as api from './user.controllers';
import { errorHandling } from '../../common/error_handling';

const router = Router();

router.route('/').post(validateBody(schemaInputUser), errorHandling(api.postMethodHandler));
router.route('/:id').get(errorHandling(api.getMethodHandler));
router.route('/').get(validateQuery(schemaGetAutoSuggest), errorHandling(api.getAllMethodHandler));
router.route('/:id').put(validateBody(schemaInputUser), errorHandling(api.putMethodHandler));
router.route('/:id').delete(errorHandling(api.deleteMethodHandler));

export { router };

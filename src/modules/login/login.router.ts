import { Router } from 'express';

import * as api from './login.controllers';
import { schemaLogin, validate } from './utils/validate-and-schemas';
import { errorHandling } from '../../common/error_handling';

const router = Router();

router.route('/').post(validate(schemaLogin), errorHandling(api.postMethodHandler));

export { router };

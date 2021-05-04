import { Request, Response, NextFunction } from 'express';
import Joi, { Schema, ValidationErrorItem } from 'joi';

export const schemaLogin = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required(),
});

export function errorToResponse(errors: ValidationErrorItem[]): Array<string> {
  return errors.map((error) => error.message);
}

export function validate(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { login, password } = req.body;

    const { error } = schema.validate({ login, password }, { abortEarly: false });

    if (error) {
      res.status(400).json(errorToResponse(error.details));
      return;
    }
    next();
  };
}

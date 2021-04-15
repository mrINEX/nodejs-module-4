import { NextFunction, Response, Request } from 'express';
import Joi, { Schema, ValidationErrorItem } from 'joi';

export const schemaInputUser = Joi.object({
  login: Joi.string().required(),
  password: Joi.string()
    .pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)
    .required(),
  age: Joi.number().min(3).max(130).required(),
});

export const schemaGetAutoSuggest = Joi.object({
  loginSubstring: Joi.string().optional(),
  limit: Joi.number().optional()
});

export function errorToResponse(errors: ValidationErrorItem[]): Array<string> {
  return errors.map((error) => error.message);
}

export function validateBody(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { login, password, age } = req.body;

    const { error } = schema.validate({ login, password, age }, { abortEarly: false });

    if (error) {
      res.status(400).json(errorToResponse(error.details));
      return;
    }
    next();
  }
}

export function validateQuery(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { loginSubstring, limit } = req.query;

    const { error } = schema.validate({ loginSubstring, limit }, { abortEarly: false });

    if (error) {
      res.status(400).json(errorToResponse(error.details));
      return;
    }
    next();
  }
}

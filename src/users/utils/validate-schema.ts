import Joi, { ValidationErrorItem } from 'joi';

export const schemaInputUser = Joi.object({
  login: Joi.string().required(),
  password: Joi.string()
    .pattern(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)
    .required(),
  age: Joi.number().min(3).max(130).required(),
});

export function errorToResponse(errors: ValidationErrorItem[]): Array<string> {
  return errors.map((error) => error.message);
}

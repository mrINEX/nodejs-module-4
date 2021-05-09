import { Request, Response, NextFunction } from 'express';
import Joi, { Schema, ValidationErrorItem } from 'joi';
import { InputGroup } from '../group.model';

export const schemaInputGroup = Joi.object({
  name: Joi.string().alphanum().required(),
  permissions: Joi.array()
    .items(Joi.string().valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES').required())
    .unique(),
});

export function errorToResponse(errors: ValidationErrorItem[]): Array<string> {
  return errors.map((error) => error.message);
}

export function validate(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { name, permissions } = req.body as InputGroup;

    const { error } = schema.validate({ name, permissions }, { abortEarly: false });

    if (error) {
      res.status(400).json(errorToResponse(error.details));
      return;
    }
    next();
  };
}

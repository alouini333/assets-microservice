import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../errors/ValidationError';

type Target = 'body' | 'params' | 'query';
export const validate = (schema: Joi.Schema, target: Target = 'body') => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[target]); // or req.params or req.query based on your needs
    if (error) {
      throw new ValidationError(error.details[0].message);
    } else {
      next();
    }
  };
};

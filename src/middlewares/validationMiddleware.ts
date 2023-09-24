import Joi from "joi";
import {  Request, Response, NextFunction } from 'express';
import { ValidationError } from "../errors/ValidationError";


export const validate = (schema: Joi.Schema) {
    return (req: Request, _res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body); // or req.params or req.query based on your needs
        if (error) {
            throw new ValidationError(error.details[0].message);
        } else {
            next();
        }
    };
}

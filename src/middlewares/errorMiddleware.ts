import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/CustomError';

export const errorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction,
): any => {
  if (err) {
    if (err instanceof CustomError) {
      return res.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    console.error('Unhandled error:', err); // Logging the unhandled error for debugging

    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  } else {
    next(); // Move to the next middleware if there's no error
  }
};

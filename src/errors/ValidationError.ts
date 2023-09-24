import { CustomError } from './CustomError';

export class ValidationError extends CustomError {
  statusCode = 400;

  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

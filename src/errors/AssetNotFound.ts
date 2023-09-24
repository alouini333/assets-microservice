import { CustomError } from './CustomError';

export class AssetNotFound extends CustomError {
  statusCode = 404;

  constructor(public message: string = 'Asset not found') {
    super(message);
    Object.setPrototypeOf(this, AssetNotFound.prototype);
  }
}

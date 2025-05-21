import { ErrorRequestHandler } from 'express';
import winston from 'winston';
import BadRequestError from '../errors/bad-request-errors';
import ConflictError from '../errors/conflict-error';
import InternalServerError from '../errors/internal-server-error';
import NotFoundError from '../errors/not-found-error';

const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  winston.error(`Ошибка: ${err.message}`, { error: err });

  if (res.headersSent) {
    return next(err);
  }

  if (
    err instanceof BadRequestError
    || err instanceof ConflictError
    || err instanceof NotFoundError
  ) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  const serverError = new InternalServerError();
  return res.status(serverError.statusCode).json({ message: serverError.message });
};

export default errorHandler;

import { ErrorRequestHandler } from 'express';
import winston from 'winston';
import BadRequestError from '../errors/bad-request-errors';
import ConflictError from '../errors/conflict-error';
import NotFoundError from '../errors/not-found-error';

const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  winston.error(`Ошибка: ${err instanceof Error ? err.message : 'Неизвестная ошибка'}`, {
    error: err,
  });

  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof BadRequestError
    || err instanceof ConflictError
    || err instanceof NotFoundError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof Error) {
    return res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }

  return res.status(500).json({ message: 'Внутренняя ошибка сервера' });
};

export default errorHandler;

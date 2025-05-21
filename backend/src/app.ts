import express from 'express';
import mongoose from 'mongoose';
import winston from 'winston';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import productsRouter from './routes/product';
import ordersRouter from './routes/order';
import { requestLogger, errorLogger } from './middlewares/logger';
import errorHandler from './middlewares/errorHandler';
import NotFoundError from './errors/not-found-error';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '../src/public/images')));
app.use(requestLogger);
app.use('/product', productsRouter);
app.use('/order', ordersRouter);

app.use((_req, _res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

app.use(errorLogger);
app.use(errorHandler);

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.DB_ADDRESS || 'mongodb://127.0.0.1:27017/weblarek');
    winston.info('Подключено к базе данных MongoDB');
  } catch (error) {
    winston.error('Ошибка подключения к базе данных:', {
      error: error instanceof Error ? error.message : String(error),
    });
    process.exit(1);
  }
};

connectToMongoDB().then(() => {
  app.listen(PORT, () => {
    winston.info(`Сервер запущен на http://localhost:${PORT}`);
  });
});

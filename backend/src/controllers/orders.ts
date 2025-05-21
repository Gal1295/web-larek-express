import { Request, Response, NextFunction } from 'express';
import { faker } from '@faker-js/faker';
import BadRequestError from '../errors/bad-request-errors';
import InternalServerError from '../errors/internal-server-error';
import Product from '../models/product';

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { items, total } = req.body;

    const products = await Product.find({ _id: { $in: items } });

    if (products.length !== items.length) {
      return next(new BadRequestError('Один или несколько товаров не найдены'));
    }

    const invalidProducts = products.filter((p) => p.price === null);
    if (invalidProducts.length > 0) {
      return next(new BadRequestError('Один или несколько товаров не продаются'));
    }

    const calculatedTotal = products.reduce((sum, p) => sum + (p.price ?? 0), 0);
    if (calculatedTotal !== total) {
      return next(new BadRequestError('Неверная сумма заказа'));
    }

    const orderId = faker.string.uuid();

    return res.status(201).json({
      id: orderId,
      total: calculatedTotal,
    });
  } catch (error) {
    return next(new InternalServerError());
  }
};
export default createOrder;

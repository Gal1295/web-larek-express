import { Request, Response, NextFunction } from 'express';
import Product from '../models/product';
import BadRequestError from '../errors/bad-request-errors';
import ConflictError from '../errors/conflict-error';
import InternalServerError from '../errors/internal-server-error';

export const getProducts = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product.find();
    return res.status(200).json({
      items: products,
      total: products.length,
    });
  } catch (error) {
    return next(new InternalServerError());
  }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      title, image, category, description, price,
    } = req.body;

    const product = await Product.create({
      title,
      image,
      category,
      description,
      price,
    });

    return res.status(201).json(product);
  } catch (error: unknown) {
    if (error instanceof Error && 'name' in error && error.name === 'ValidationError') {
      return next(new BadRequestError(error.message));
    }

    if (
      typeof error === 'object' && error !== null && 'code' in error && (error as { code?: number }).code === 11000
    ) {
      return next(new ConflictError('Товар с таким названием уже существует'));
    }

    return next(new InternalServerError());
  }
};

import { Request, Response, NextFunction } from 'express';
import Product, { IProduct } from '../models/product';
import BadRequestError from '../errors/bad-request-errors';
import ConflictError from '../errors/conflict-error';
import InternalServerError from '../errors/internal-server-error';

export const getProducts = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product.find();
    return res.status(200).json({ items: products });
  } catch (error) {
    return next(new InternalServerError());
  }
};

export const createProduct = async (
  req: Request<{}, {}, IProduct>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      title,
      image,
      category,
      description,
      price,
    }: IProduct = req.body;

    const product = new Product({
      title,
      image,
      category,
      description,
      price,
    });

    const savedProduct = await product.save();

    return res.status(201).json(savedProduct);
  } catch (error: unknown) {
    if (error instanceof Error && error.name === 'ValidationError') {
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

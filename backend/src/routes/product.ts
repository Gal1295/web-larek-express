import express from 'express';
import { celebrate, Joi } from 'celebrate';
import { getProducts, createProduct } from '../controllers/products';

const router = express.Router();

router.get('/', getProducts);

router.post(
  '/',
  celebrate({
    body: Joi.object({
      title: Joi.string().min(2).max(30).required(),
      image: Joi.object({
        fileName: Joi.string().required(),
        originalName: Joi.string().required(),
      }).required(),
      category: Joi.string().required(),
      description: Joi.string().optional(),
      price: Joi.number().allow(null).optional(),
    }),
  }),
  createProduct,
);

export default router;

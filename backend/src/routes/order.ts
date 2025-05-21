import express from 'express';
import { celebrate, Joi } from 'celebrate';
import createOrder from '../controllers/orders';

const router = express.Router();

router.post(
  '/',
  celebrate({
    body: Joi.object({
      payment: Joi.string().valid('card', 'online').required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      address: Joi.string().min(5).required(),
      total: Joi.number().positive().required(),
      items: Joi.array()
        .items(Joi.string().required())
        .min(1)
        .required(),
    }),
  }),
  createOrder,
);

export default router;

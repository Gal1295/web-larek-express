import { model, Schema } from 'mongoose';

const productSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Поле "title" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "title" - 2'],
    maxlength: [30, 'Максимальная длина поля "title" - 30'],
    unique: true,
    trim: true,
  },
  image: {
    type: {
      fileName: { type: String, required: true },
      originalName: { type: String, required: true },
    },
    required: true,
  },
  category: {
    type: String,
    required: [true, 'Поле "category" должно быть заполнено'],
    trim: true,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  price: {
    type: Number,
    default: null,
    validate: {
      validator: (v: number | null) => v === null || typeof v === 'number',
      message: 'Поле "price" должно быть числом или null',
    },
  },
});

export default model('product', productSchema);

import { Joi } from 'celebrate';

export default {
  createProduct: {
    body: {
      name: Joi.string()
        .min(5)
        .max(200)
        .required(),
      description: Joi.string()
        .min(10)
        .max(500)
        .required(),
      price: Joi.number()
        .min(0)
        .required(),
      quantity: Joi.number()
        .min(0)
        .required(),
      totalStock: Joi.number()
        .min(0)
        .required(),
      brandId: Joi.string()
        .min(24)
        .max(24)
        .required(),
      categoryId: Joi.string()
        .min(24)
        .max(24)
        .required(),
      discountId: Joi.string()
        .min(24)
        .max(24)
        .required(),
      tagId: Joi.string()
        .min(24)
        .max(24)
        .required()
    }
  }
};

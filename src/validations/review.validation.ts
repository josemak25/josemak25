import { Joi } from 'celebrate';

export default {
  createReview: {
    body: {
      comment: Joi.string()
        .min(5)
        .max(200)
        .required(),
      productId: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required()
    }
  },

  getProductReview: {
    params: {
      productId: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required()
    }
  }
};

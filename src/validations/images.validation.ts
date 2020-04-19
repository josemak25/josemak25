import { Joi } from 'celebrate';

export default {
  createImage: {
    body: {
      referenceId: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required()
    }
  },

  getProductImages: {
    params: {
      referenceId: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required()
    }
  }
};

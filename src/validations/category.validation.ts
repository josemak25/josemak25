import { Joi } from 'celebrate';

export default {
  createCategory: {
    body: {
      name: Joi.string()
        .min(5)
        .max(200)
        .required(),
      parents: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .default(null),
      isDeleted: Joi.boolean()
        .default(false)
        .required()
    }
  }
};

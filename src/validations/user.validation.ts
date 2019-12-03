import { Joi } from "celebrate";

export default {
  createUser: {
    body: {
      name: Joi.string()
        .max(200)
        .required(),
      age: Joi.number().required()
    }
  },

  loginUser: {
    body: {
      name: Joi.string()
        .max(250)
        .required()
    }
  }
};

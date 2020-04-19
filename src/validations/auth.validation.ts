import { Joi } from 'celebrate';
import { Gender, Role } from '../types/user';

export default {
  signupUser: {
    body: {
      firstName: Joi.string()
        .min(2)
        .max(250)
        .required(),
      lastName: Joi.string()
        .min(2)
        .max(250)
        .required(),
      phone: Joi.string()
        .min(11)
        .max(11)
        .pattern(/^(\+234|0)\d{10}$/)
        .required(),
      email: Joi.string()
        .email()
        .default(null),
      password: Joi.string()
        .min(6)
        .required(),
      DOB: Joi.date().default(null),
      isBlocked: Joi.boolean().default(false),
      isVerified: Joi.boolean().default(false),
      gender: Joi.string()
        .allow(Gender.MALE, Gender.FEMALE)
        .default(Gender.MALE),
      role: Joi.string()
        .allow(Role.CUSTOMER, Role.ADMIN)
        .default(Role.CUSTOMER)
    }
  },

  loginUser: {
    body: {
      phone: Joi.string()
        .min(11)
        .max(11)
        .pattern(/^(\+234|0)\d{10}$/)
        .required(),
      password: Joi.string()
        .min(6)
        .required()
    }
  }
};

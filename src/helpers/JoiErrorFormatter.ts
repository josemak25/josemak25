import { JoiErrorInterface } from './types';

/**
 * Returns a custom error object with descriptive messages.
 * @property {Array} arr - Array of Joi validation errors.
 * @returns {Object}
 */

export const JoiErrorFormatter = (error: JoiErrorInterface[]): object => {
  return error.reduce<any>((acc, err) => {
    const key: string = err.path[0];
    acc[key] = err.message.replace(/"/g, '');
    if (key === 'phone') acc[key] = 'Phone number must be a valid number!';
    return acc;
  }, {});
};

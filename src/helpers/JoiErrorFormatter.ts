import { JoiErrorInterface } from "../types/customError.type";

/**
 * Returns a custom error object with descriptive messages.
 * @property {Array} arr - Array of Joi validation errors.
 * @returns {Object}
 */

export const JoiErrorFormatter = (error: JoiErrorInterface[]) => {
  return error.reduce<any>((acc, err) => {
    acc[err.path[0]] = err.message.replace(/"/g, "");
    return acc;
  }, {});
};

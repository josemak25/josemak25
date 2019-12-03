/**
 * @param {Number} statusCode - status code of the response
 * @param {string} message - message identify the code
 * @param {{}} payload - response object
 * @param {Error} error - error message
 * @param {Token} token - jwt token
 */

export default function Response(
  statusCode: number,
  message: string,
  payload?: object | null,
  errors?: object | null,
  token?: string | null
) {
  return {
    statusCode,
    message,
    payload,
    errors,
    token
  };
}

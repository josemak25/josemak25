import config from '.';
import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { isCelebrate } from 'celebrate';

import { ErrorResponseInterface, ExpressErrorInterface } from './types';

import APIError from '../helpers/APIErrors';
import { JoiErrorFormatter } from '../helpers/JoiErrorFormatter';

function customError() {
  const handler = (
    err: ExpressErrorInterface,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    const response: ErrorResponseInterface = {
      statusCode: err.status,
      //@ts-ignore
      message: err.message || httpStatus[err.status],
      errors: err.errors,
      payload: null,
      stack: err.stack
    };

    if (config.env !== 'development') {
      delete response.stack;
    }
    res.status(err.status).json(response);
  };

  const converter = (
    err: ExpressErrorInterface,
    req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    let convertedError: Error = err;
    if (isCelebrate(err)) {
      convertedError = new APIError({
        message: 'Invalid fields',
        status: httpStatus.BAD_REQUEST, //unprocessible entity
        //@ts-ignore
        errors: JoiErrorFormatter(err.joi.details) || {},
        payload: {}
      });
    } else if (!(err instanceof APIError)) {
      convertedError = new APIError({
        message: err.message,
        status: err.status,
        stack: err.stack,
        errors: null
      });
    }

    //@ts-ignore
    return handler(convertedError, req, res);
  };

  const errorHandler = (
    err: Error,
    _req: Request,
    _res: Response,
    next: NextFunction
  ) => {
    if (err) {
      //@ts-ignore
      const tokenError = new APIError('Unauthorized', err.status, true);
      next(tokenError);
    }
    next();
  };

  // catch 404 errors
  const notFound = (req: Request, res: Response) => {
    const err = new APIError({
      message: 'Not found',
      status: httpStatus.NOT_FOUND,
      stack: undefined,
      errors: null
    });

    //@ts-ignore
    return handler(err, req, res);
  };

  return {
    handler,
    converter,
    errorHandler,
    notFound
  };
}

export default customError();

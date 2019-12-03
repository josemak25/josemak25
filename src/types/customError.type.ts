export interface CustomErrorInterface {
  handler: Function;
  converter: Function;
  errorHandler: Function;
  notFound: Function;
}

export interface ErrorResponseInterface {
  message: string;
  errors: string;
  stack: string | undefined;
  statusCode: number;
  payload?: object | null;
}

export interface HttpExceptionInterface {
  message: string;
  status: number;
  errors: object | null;
  stack?: string | undefined;
  isPublic?: boolean | undefined;
  payload?: object;
}

export interface JoiErrorInterface {
  message: string;
  path: string[];
  type: string;
}

export interface ExpressErrorInterface extends Error {
  errors: string;
  status: number;
}

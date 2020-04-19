export type ConfigTypes = {
  env: string;
  port: string;
  mongooseDebug: boolean;
  jwtSecret: string;
  bcryptRound: number;
  jwtExpirationInterval: number;
  mongoUri: string;
  driveClientEmail: string;
  drivePrivateKey: string;
  drivePrivateKeyID: string;
};

export interface ErrorResponseInterface {
  message: string;
  errors: string;
  stack: string | undefined;
  statusCode: number;
  payload?: object | null;
}

export interface ExpressErrorInterface extends Error {
  errors: string;
  status: number;
}

import fs from 'fs';
import path from 'path';
import OS from 'os';
import dotEnv from 'dotenv';
import { Joi } from 'celebrate';
import { ConfigTypes } from './types';
dotEnv.config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(6060),
  MONGOOSE_DEBUG: Joi.boolean().when('NODE_ENV', {
    is: Joi.string().equal('development'),
    then: Joi.boolean().default(true),
    otherwise: Joi.boolean().default(false)
  }),
  MONGO_HOST: Joi.string()
    .default('mongodb://localhost')
    .description('Database host name')
    .required(),
  BCRYPT_ROUND: Joi.number()
    .required()
    .description('bcrypt password hash'),
  JWT_SECRET: Joi.string()
    .required()
    .description('JWT required to sign token'),
  JWT_EXPIRY: Joi.string()
    .required()
    .description('JWT expiry required to sign off token expiry time'),
  DRIVE_CLIENT_EMAIL: Joi.string()
    .required()
    .description('google drive client email address'),
  DRIVE_PRIVATE_KEY_ID: Joi.string()
    .required()
    .description('google drive private key id'),
  DRIVE_PRIVATE_KEY: Joi.string()
    .required()
    .description('google drive private key')
})
  .unknown()
  .required();

const { error, value: envVariables } = envVarsSchema.validate(process.env);

if (error) throw new Error(`Config validation error: ${error.message}`);

// temporary folder to store all uncompressed asset uploads
export const unCompressedImageDir = path.join(OS.tmpdir(), 'uncompressed');

// temporary folder to store all compressed asset uploads
export const compressedImageDir = path.join(OS.tmpdir(), 'compressed');

if (!fs.existsSync(compressedImageDir)) fs.mkdirSync(compressedImageDir);

const config: ConfigTypes = {
  env: envVariables.NODE_ENV,
  port: envVariables.PORT,
  mongooseDebug: envVariables.MONGOOSE_DEBUG,
  jwtSecret: envVariables.JWT_SECRET,
  bcryptRound: envVariables.JWT_SECRET,
  jwtExpirationInterval: envVariables.JWT_EXPIRY,
  mongoUri: envVariables.MONGO_HOST,
  driveClientEmail: envVariables.DRIVE_CLIENT_EMAIL,
  drivePrivateKey: envVariables.DRIVE_PRIVATE_KEY,
  drivePrivateKeyID: envVariables.DRIVE_PRIVATE_KEY_ID
};

export default config;

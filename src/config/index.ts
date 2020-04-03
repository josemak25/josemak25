import dotEnv from 'dotenv';
import { Joi } from 'celebrate';
import { ConfigTypes } from './types';
dotEnv.config();

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
  PORT: Joi.number().default(6060),
  MONGOOSE_DEBUG: Joi.boolean().when('NODE_ENV', {
    is: Joi.string().equal('development'),
    then: Joi.boolean().default(true),
    otherwise: Joi.boolean().default(false)
  }),
  MONGO_HOST: Joi.string()
    .required()
    .default('mongodb://localhost')
    .description('Database host name'),
  BCRYPT_ROUND: Joi.number()
    .required()
    .description('bcrypt password hash'),
  JWT_SECRET: Joi.string()
    .required()
    .description('JWT required to sign token'),
  JWT_EXPIRY: Joi.string()
    .required()
    .description('JWT expiry required to sign off token expiry time')
})
  .unknown()
  .required();

const { error, value: envVariables } = envVarsSchema.validate(process.env);

if (error) throw new Error(`Config validation error: ${error.message}`);

const config: ConfigTypes = {
  env: envVariables.NODE_ENV,
  port: envVariables.PORT,
  mongooseDebug: envVariables.MONGOOSE_DEBUG,
  jwtSecret: envVariables.JWT_SECRET,
  bcryptRound: envVariables.JWT_SECRET,
  jwtExpirationInterval: envVariables.JWT_EXPIRY,
  mongoUri: envVariables.MONGO_HOST
};

export default config;

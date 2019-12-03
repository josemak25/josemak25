import environmentVariables from "dotenv";
environmentVariables.config();

import { Joi } from "celebrate";

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(["development", "production", "test", "provision"])
    .default("development"),
  PORT: Joi.number().default(6060),
  MONGOOSE_DEBUG: Joi.boolean().when("NODE_ENV", {
    is: Joi.string().equal("development"),
    then: Joi.boolean().default(true),
    otherwise: Joi.boolean().default(false)
  }),
  JWT_SECRET: Joi.string()
    .required()
    .description("JWT Secret required to sign"),
  JWT_EXPIRATION_INTERVAL: Joi.string()
    .required()
    .description("JWT_EXPIRATION_INTERVAL required to sign"),
  MONGO_HOST: Joi.string()
    .required()
    .description("Mongo DB host url"),
  MONGO_PORT: Joi.number().default(27017)
})
  .unknown()
  .required();

const { error, value: envVariables } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVariables.NODE_ENV,
  port: envVariables.PORT,
  mongooseDebug: envVariables.MONGOOSE_DEBUG,
  jwtSecret: envVariables.JWT_SECRET,
  jwtExpirationInterval: envVariables.JWT_EXPIRATION_INTERVAL,
  mongo: {
    host:
      process.env.NODE_ENV === "development"
        ? envVariables.MONGO_HOST
        : envVariables.MONGO_HOST_TEST,
    port: envVariables.MONGO_PORT
  },
  clientSideUrl: envVariables.CLIENT_SIDE_URL,
  hi_chat_email: envVariables.HI_CHAT_DEV_EMAIL
};

export default config;

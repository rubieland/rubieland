import * as dotenv from 'dotenv';
dotenv.config();

const requiredEnvVariables = [
  'APP_HOST',
  'APP_PORT',
  'CLIENT_HOST',
  'CLIENT_PORT',
  'DEV_DB_URI',
  'PROD_DB_URI',
  'NODE_ENV',
  'JWT_SECRET',
  'JWT_EXPIRATION',
  'SESSION_SECRET',
  'COOKIE_MAX_AGE',
] as const;

type EnvVariables = {
  [key in (typeof requiredEnvVariables)[number]]: string;
};

// load .env variables to access them globally in app
const loadEnvVariables = (): EnvVariables => {
  const env = {} as EnvVariables;

  requiredEnvVariables.forEach((variable) => {
    const value = process.env[variable];
    if (!value || value === '') {
      console.error(`The env variable "${variable}" is missing or undefined`);
      process.exit(1);
    }
    env[variable] = value;
  });

  return env;
};

export const env = loadEnvVariables();

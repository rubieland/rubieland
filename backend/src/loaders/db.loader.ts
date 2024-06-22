import mongoose from 'mongoose';
import { env } from './env.loader';

// destructure env to get env variables
const { NODE_ENV, DEV_DB_URI, PROD_DB_URI } = env;

// define db uri depending on mode (dev or prod)
const MONGO_URI = NODE_ENV === 'development' ? DEV_DB_URI : PROD_DB_URI;

export const loadDatabaseConnection = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connection to database successful!');
  } catch (error: unknown) {
    console.error(`Connection to database failed : ${error}`);
    process.exit(1);
  }
};

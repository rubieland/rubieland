import mongoose from 'mongoose';
import { t } from './i18n.loader';
import * as dotenv from 'dotenv';

dotenv.config();

const { NODE_ENV, DEV_DB_URI, PROD_DB_URI } = process.env;

// define db uri depending on mode (dev or prod)
const MONGO_URI = NODE_ENV === 'development' ? DEV_DB_URI : PROD_DB_URI;

export const loadDatabaseConnection = async () => {
  try {
    if (!MONGO_URI || MONGO_URI === '') {
      throw new Error('MONGO_URI is undefined!');
    }

    await mongoose.connect(MONGO_URI);
    console.log('Connection to database successful!');
  } catch (err) {
    console.error(`Connection to database failed : ${err}`);
    process.exit(1);
  }
};

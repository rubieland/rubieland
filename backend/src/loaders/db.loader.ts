import mongoose from 'mongoose';
import { env } from './env.loader';

const { DB_URI } = env;

export const loadDatabaseConnection = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log('Connection to database successful!');
  } catch (error: unknown) {
    console.error(`Connection to database failed : ${error}`);
    process.exit(1);
  }
};

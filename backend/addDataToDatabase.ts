import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { readFile } from 'fs/promises';
import User from './src/models/User.model';
dotenv.config();

const { NODE_ENV, DEV_DB_URI, PROD_DB_URI } = process.env;
const MONGO_URI = NODE_ENV === 'development' ? DEV_DB_URI : PROD_DB_URI;

// function to load and insert user data
async function insertUsers() {
  try {
    // read json file with users data
    const data = await readFile('./data/users.json', 'utf8');
    // parse the data
    const usersData = JSON.parse(data);

    // loop on each user and save it in base (we loop and use save() on each user to trigger pre("save") method from User model)
    for (const userData of usersData) {
      const user = new User(userData);
      await user.save();
      console.log(`User ${user.email} inserted successfully!`);
    }
  } catch (err) {
    console.error('An error occurred while trying to insert users:', err);
    throw err;
  }
}

// ----- other insertData functions ----- \\

// main function to handle the connection and data insertion
async function main() {
  try {
    if (!MONGO_URI) throw new Error('MONGO_URI env variable is undefined');

    await mongoose.connect(MONGO_URI, {});
    console.log('Connection to database successful!');

    await insertUsers();

    console.log('All data inserted successfully!');
  } catch (err) {
    console.error('An error occurred:', err);
    process.exit(1);
  } finally {
    mongoose
      .disconnect()
      .then(() => {
        console.log('Database connection closed.');
        process.exit(0);
      })
      .catch((err) => {
        console.error('Error closing the database connection:', err);
        process.exit(1);
      });
  }
}

// execute the main function
main();
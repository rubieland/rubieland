import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { readFile } from 'fs/promises';
import User from './src/models/User.model';
import Post from './src/models/Post.model';
import Prestation from './src/models/Prestation.model';
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

    // loop on all users and save each user in base (we loop and use save() on each user to trigger pre("save") method from User model)
    for (const userData of usersData) {
      const user = new User(userData);
      await user.save();
      console.log(`User with email "${user.email}" inserted successfully!`);
    }
  } catch (err) {
    console.error('An error occurred while trying to insert users:', err);
    throw err;
  }
}

// function to load and insert posts
async function insertPosts() {
  try {
    // read json file with blog posts data
    const data = await readFile('./data/posts.json', 'utf8');
    // parse the data
    const postsData = JSON.parse(data);

    // loop on all post and save each post in base
    for (const postData of postsData) {
      const post = new Post(postData);
      await post.save();
      console.log(
        `Blog post with title "${post.title}" inserted successfully!`,
      );
    }
  } catch (err) {
    console.error('An error occurred while trying to insert blog posts:', err);
    throw err;
  }
}

// function to load and insert prestations
async function insertPrestations() {
  try {
    // read json file with prestations data
    const data = await readFile('./data/prestations.json', 'utf8');
    // parse the data
    const prestationsData = JSON.parse(data);

    // loop on all prestations and save each prestation in base
    for (const prestationData of prestationsData) {
      const prestation = new Prestation(prestationData);
      await prestation.save();
      console.log(
        `Prestation with title "${prestation.title}" inserted successfully!`,
      );
    }
  } catch (err) {
    console.error('An error occurred while trying to insert prestations:', err);
    throw err;
  }
}

// main function to handle the connection and data insertion
async function main() {
  try {
    if (!MONGO_URI) throw new Error('MONGO_URI env variable is undefined');

    await mongoose.connect(MONGO_URI, {});
    console.log('Connection to database successful!');

    // execute all the insertData() functions
    await insertUsers();
    await insertPosts();
    await insertPrestations();

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

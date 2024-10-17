import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { readFile } from 'fs/promises';
import Post from './src/models/Post.model';
dotenv.config();

const { NODE_ENV, DEV_DB_URI, PROD_DB_URI } = process.env;
const MONGO_URI = NODE_ENV === 'development' ? DEV_DB_URI : PROD_DB_URI;

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

// main function to handle the connection and data insertion
async function main() {
  try {
    if (!MONGO_URI) throw new Error('MONGO_URI env variable is undefined');

    await mongoose.connect(MONGO_URI, {});
    console.log('Connection to database successful!');

    // call the function to insert the posts
    await insertPosts();

    console.log('All posts inserted successfully!');
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

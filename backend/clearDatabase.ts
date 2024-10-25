import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();

const uri = process.env.DB_URI;

async function clearDatabase() {
  if (!uri) {
    throw new Error('The environment variable DB_URI is not defined');
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db();

    const collections = await db.collections();

    for (const collection of collections) {
      await collection.deleteMany({});
      console.log(
        `Collection "${collection.collectionName}" has been cleared.`,
      );
    }

    console.log('All collections have been successfully cleared.');
  } catch (error) {
    console.error('Error while clearing the database:', error);
  } finally {
    await client.close();
    console.log('MongoDB connection closed.');
  }
}

clearDatabase();

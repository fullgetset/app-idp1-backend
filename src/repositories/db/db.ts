import { MongoClient } from 'mongodb';

const mongoUri = process.env.mongoUri || 'mongodb://localhost:3005';

export const client = new MongoClient(mongoUri);

export const runDb = async () => {
  try {
    await client.connect();

    await client.db('books').command({ ping: 1 });

    console.log('Connected successfully to mongo server');
  } catch {
    console.log('Cant connect to db');

    await client.close();
  }
};

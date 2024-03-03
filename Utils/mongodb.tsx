import { Db, MongoClient, MongoClientOptions, ServerApiVersion } from 'mongodb'
import mongoose from 'mongoose';


let uri = process.env.MONGODB_URI || '';
let dbName = process.env.MONGODB_DB || '';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

if (!dbName) {
    throw new Error('Please define the MONGODB_DB environment variable inside .env.local');
}

export async function connectToDatabase() {

    if (cachedClient && cachedDb) {
        return { client: cachedClient, db: cachedDb }
    }
    if (!uri) return { client: null, db: null }
    const options = { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1, dbName: dbName }
    const client = await mongoose.connect(uri, options);

    // Connect the client to the server (optional starting in v4.7)
    // Establish and verify connection
    // const dbConnect = await client.
    // console.log("Connected successfully to server");

    return { client }

}

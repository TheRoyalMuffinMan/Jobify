import { MongoClient, Db } from "mongodb";

const MONGODB_URL: string = process.env.MONGODB_URL ?? '';
const MONGODB_DB: string = process.env.MONGODB_DB ?? '';

// Check the MongoDB URL
if (!MONGODB_URL.length) {
    throw new Error("Define the MONGODB_URL environmental variable");
}

// Check the MongoDB DB
if (!MONGODB_DB.length) {
    throw new Error("Define the MONGODB_DB environmental variable");
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase() {
    // check the cached
    if (cachedClient && cachedDb) {
        // load from cache
        return {
            client: cachedClient,
            db: cachedDb
        };
    }

    // Connect to cluster
    let client = new MongoClient(MONGODB_URL);
    await client.connect();
    let db = client.db(MONGODB_DB);

    // set cache
    cachedClient = client;
    cachedDb = db;

    return {
        client: cachedClient,
        db: cachedDb
    };
}
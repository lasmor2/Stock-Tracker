import { MongoClient, Db } from 'mongodb';

const MONGODB_URI = process.env.DATABASE_URL;

if (!MONGODB_URI) {
    throw new Error('Please define the DATABASE_URL environment variable');
}

declare global {
    var mongoClient: {
        client: MongoClient | null;
        db: Db | null;
        promise: Promise<{ client: MongoClient; db: Db }> | null;
    };
}

let cached = global.mongoClient;

if (!cached) {
    cached = global.mongoClient = { client: null, db: null, promise: null };
}

export async function connectToMongoDB() {
    if (cached.client && cached.db) {
        return { client: cached.client, db: cached.db };
    }

    if (!cached.promise) {
        const client = new MongoClient(MONGODB_URI);
        cached.promise = client.connect().then((client) => {
            const db = client.db();
            return { client, db };
        });
    }

    try {
        const { client, db } = await cached.promise;
        cached.client = client;
        cached.db = db;
        return { client, db };
    } catch (error) {
        cached.promise = null;
        throw error;
    }
}
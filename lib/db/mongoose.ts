import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache ?? { conn: null, promise: null };
global.mongooseCache = cached;

function resetCache() {
  cached.conn = null;
  cached.promise = null;
}

export function isDbConfigured(): boolean {
  return Boolean(MONGO_URI);
}

export async function connectDB(): Promise<typeof mongoose | null> {
  if (!MONGO_URI) return null;

  if (cached.conn) {
    if (cached.conn.connection.readyState === 1) {
      return cached.conn;
    }
    resetCache();
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGO_URI, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 10000,
        connectTimeoutMS: 10000,
        maxPoolSize: 10,
      })
      .then((conn) => {
        conn.connection.on('disconnected', resetCache);
        conn.connection.on('error', resetCache);
        return conn;
      })
      .catch((error) => {
        resetCache();
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

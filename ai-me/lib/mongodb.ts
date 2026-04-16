import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

/**
 * Global cache to prevent multiple connections during Next.js hot-reload in development.
 * In production, module-level state is fresh per serverless invocation.
 */
declare global {
  // eslint-disable-next-line no-var
  var _mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

const cached = global._mongooseCache ?? { conn: null, promise: null };
global._mongooseCache = cached;

export async function connectDB(): Promise<typeof mongoose> {
  if (!MONGO_URI) {
    throw new Error(
      "Please define the MONGO_URI environment variable in .env.local or your deployment dashboard"
    );
  }

  if (cached.conn) {
    console.log("♻️  Using existing MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    console.log("⏳ Connecting to MongoDB...");
    cached.promise = mongoose.connect(MONGO_URI, opts).then((instance) => {
      console.log("━━━━━ DATABASE CONNECTED ━━━━━");
      console.log("✅ MongoDB connected successfully");
      return instance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}

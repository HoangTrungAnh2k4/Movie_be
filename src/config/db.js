import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import { MongoClient, ServerApiVersion } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;
const DATABASE_NAME = process.env.DATABASE_NAME;

let dbClient = null;

const clientInstance = new MongoClient(MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const CONNECT_DB = async () => {
  try {
    await clientInstance.connect();
    dbClient = clientInstance.db(DATABASE_NAME);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

export const GET_DB = () => {
  if (!dbClient)
    throw new Error("Database not connected. Call CONNECT_DB first.");
  return dbClient;
};

import { MongoClient } from "mongodb";
import { Game } from "../types";

const mongoUri = process.env.mongURI || "mongodb://0.0.0.0:27017";

const client = new MongoClient(mongoUri);
const gamesDB = client.db("games");

export const gamesCollection = gamesDB.collection<Game>("games");

export async function runDB() {
  try {
    await client.connect();

    await client.db("games").command({ ping: 1 });
    console.log("Connected to db");
  } catch {
    await client.close();
  }
}

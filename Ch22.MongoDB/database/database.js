import MongoDb from "mongodb";
import { config } from "../config.js";

// MongoDB 연결

let db;

export async function connectDB() {
  return MongoDb.MongoClient.connect(config.db.host, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then((client) => {
    db = client.db();
  });
}

// users 컬렉션 조회
export function getUsers() {
  return db.collection("users");
}

// tweets 컬렉션 조회
export function getTweets() {
  return db.collection("tweets");
}

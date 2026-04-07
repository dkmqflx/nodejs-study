import Mongoose from "mongoose";
import { config } from "../config.js";

export async function connectDB() {
  // Mongoose 연결
  return Mongoose.connect(config.db.host, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
}

// 가상 ID 설정
export function useVirtualId(schema) {
  schema.virtual("id").get(function () {
    return this._id.toString();
  });
  schema.set("toJSON", { virtuals: true });
  schema.set("toOject", { virtuals: true });
}

// TODO(Ellie): Delete blow

let db;
export function getTweets() {
  return db.collection("tweets");
}

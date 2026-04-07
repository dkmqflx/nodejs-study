import Mongoose from "mongoose";
import { useVirtualId } from "../database/database.js";
import * as UserRepository from "./auth.js";

// 트윗 스키마
const tweetSchema = new Mongoose.Schema(
  {
    text: { type: String, required: true },
    userId: { type: String, required: true },
    name: { type: String, required: true },
    username: { type: String, required: true },
    url: String,
  },
  { timestamps: true }
);

useVirtualId(tweetSchema);
const Tweet = Mongoose.model("Tweet", tweetSchema);

// 모든 트윗 조회
export async function getAll() {
  return Tweet.find().sort({ createdAt: -1 });
}

// 사용자 이름으로 트윗 조회
export async function getAllByUsername(username) {
  return Tweet.find({ username }).sort({ createdAt: -1 });
}

// 트윗 ID로 트윗 조회
export async function getById(id) {
  return Tweet.findById(id);
}

// 트윗 생성
export async function create(text, userId) {
  return UserRepository.findById(userId).then((user) =>
    new Tweet({
      text,
      userId,
      name: user.name,
      username: user.username,
    }).save()
  );
}

// 트윗 업데이트
export async function update(id, text) {
  return Tweet.findByIdAndUpdate(id, { text }, { returnOriginal: false });
}

// 트윗 삭제
export async function remove(id) {
  return Tweet.findByIdAndDelete(id);
}

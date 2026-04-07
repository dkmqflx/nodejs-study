import Mongoose from "mongoose";
import { useVirtualId } from "../database/database.js";

const userSchema = new Mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  url: String,
});

useVirtualId(userSchema);
const User = Mongoose.model("User", userSchema);

// 사용자 이름으로 사용자 찾기
export async function findByUsername(username) {
  return User.findOne({ username });
}

// 사용자 ID로 사용자 찾기
export async function findById(id) {
  return User.findById(id);
}

// 사용자 생성
export async function createUser(user) {
  return new User(user).save().then((data) => data.id);
}

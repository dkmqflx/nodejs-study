import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {} from "express-async-errors";
import * as userRepository from "../data/auth.js";

// TODO: Make it secure!
// 서버코드에서 이런 것 같고 있는것 좋지 않기 때문에 이어지는 configuration 강의에서 수정한다
const jwtSecretKey = "F2dN7x8HVzBWaQuEEDnhsvHXRWqAR63z";
const jwtExpiresInDays = "2d";
const bcryptSaltRounds = 12;

export async function signup(req, res) {
  const { username, password, name, email, url } = req.body;
  const found = await userRepository.findByUsername(username);
  if (found) {
    return res.status(409).json({ message: `${username} already exists` });
  }
  const hashed = await bcrypt.hash(password, bcryptSaltRounds);
  const userId = await userRepository.createUser({
    username,
    password: hashed,
    name,
    email,
    url,
  });
  const token = createJwtToken(userId);
  res.status(201).json({ token, username });
}

export async function login(req, res) {
  const { username, password } = req.body;
  const user = await userRepository.findByUsername(username);
  if (!user) {
    return res.status(401).json({ message: "Invalid user or password" });
    // 보안과 관련되어 있기 때문에 메세지를 친절하게 보내주지 않는다
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: "Invalid user or password" });
    // 보안과 관련되어 있기 때문에 메세지를 친절하게 보내주지 않는다
  }
  const token = createJwtToken(user.id);
  res.status(200).json({ token, username });
}

function createJwtToken(id) {
  return jwt.sign({ id }, jwtSecretKey, { expiresIn: jwtExpiresInDays });
}

export async function me(req, res, next) {
  const user = await userRepository.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ token: req.token, username: user.username });
}

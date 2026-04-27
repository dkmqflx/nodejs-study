import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {} from "express-async-errors";
import * as userRepository from "../data/auth.js";
import { config } from "../config.js";

export async function signup(req, res) {
  const { username, password, name, email, url } = req.body;
  const found = await userRepository.findByUsername(username);
  if (found) {
    return res.status(409).json({ message: `${username} already exists` });
  }
  const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
  const userId = await userRepository.createUser({
    username,
    password: hashed,
    name,
    email,
    url,
  });
  const token = createJwtToken(userId); // cookie header -> 헤더에 해당 요소를 포함하여 응답(body가 아니라 쿠키로 전달)
  setToken(res, token);
  res.status(201).json({ token, username }); // body로 두는 이유는 쿠키로 두면 브라우저 외의 모바일 같은 것에서 사용할 수 없기 때문
}

export async function login(req, res) {
  const { username, password } = req.body;
  const user = await userRepository.findByUsername(username);
  if (!user) {
    return res.status(401).json({ message: "Invalid user or password" });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: "Invalid user or password" });
  }
  const token = createJwtToken(user.id);
  setToken(res, token);
  res.status(200).json({ token, username });
}

// 로그아웃 함수
export async function logout(req, res, next) {
  res.cookie("token", ""); // 쿠키를 비워줌
  res.status(200).json({ message: "User has been logged out" });
}

function createJwtToken(id) {
  return jwt.sign({ id }, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresInSec,
  });
}

// 쿠키를 설정하는 함수
function setToken(res, token) {
  const options = {
    maxAge: config.jwt.expiresInSec * 1000, // 토큰 만료 시간
    httpOnly: true, // 쿠키를 브라우저에서만 접근할 수 있도록
    sameSite: "none", // 서버와 클라이언트가 다른 도메인일 때 통신할 수 있도록
    secure: true, // 쿠키를 HTTPS로 전송할 수 있도록
  };
  res.cookie("token", token, options); // HTTP-ONLY 🍪 -> 쿠키를 설정하는 함수
}

export async function me(req, res, next) {
  const user = await userRepository.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ token: req.token, username: user.username });
}

export async function csrfToken(req, res, next) {
  const csrfToken = await generateCSRFToken();
  res.status(200).json({ csrfToken });
}

async function generateCSRFToken() {
  return bcrypt.hash(config.csrf.plainToken, 1);
}

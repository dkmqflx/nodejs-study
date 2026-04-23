import jwt from "jsonwebtoken";
import { config } from "../config.js";
import * as userRepository from "../data/auth.js";

const AUTH_ERROR = { message: "Authentication Error" };

export const isAuth = async (req, res, next) => {
  // 쿠키 관련된 것 확인하는 로직

  // 1. Cookie (for Browser) -> 쿠키가 헤더에 있는지 아닌지
  // 2. Header (for Non-Browser Client) -> 헤더에 토큰이 있는지 아닌지

  let token;
  // check the header first -> 헤더에 토큰이 있는지 아닌지
  const authHeader = req.get("Authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  // if no token in the header, check the cookie -> 헤더에 토큰이 없으면 쿠키에 토큰이 있는지 아닌지
  if (!token) {
    token = req.cookies["token"];
  }

  // if no token in the header or cookie, return 401 error
  if (!token) {
    return res.status(401).json(AUTH_ERROR);
  }

  // 토큰 있는 경우 기존에 작성한 로직 실행
  jwt.verify(token, config.jwt.secretKey, async (error, decoded) => {
    if (error) {
      return res.status(401).json(AUTH_ERROR);
    }
    const user = await userRepository.findById(decoded.id);
    if (!user) {
      return res.status(401).json(AUTH_ERROR);
    }
    req.userId = user.id; // req.customData
    req.token = token;
    next();
  });
};

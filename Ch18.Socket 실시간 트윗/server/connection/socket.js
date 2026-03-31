import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { config } from "../config.js";

class Socket {
  constructor(server) {
    this.io = new Server(server, {
      cors: {
        origin: "*",
      },
    });

    this.io.use((socket, next) => {
      const token = socket.handshake.auth.token;

      // 토큰이 없으면 에러 발생
      if (!token) {
        return next(new Error("Authentication error"));
        // 다음으로 넘어갈 때 에러 던진다
      }

      // 토큰 검증
      jwt.verify(token, config.jwt.secretKey, (error, decoded) => {
        if (error) {
          return next(new Error("Authentication error"));
        }
        next();
      });
    });

    // 소켓 연결
    this.io.on("connection", (socket) => {
      console.log("Socket client connected");
    });
  }
}

let socket;
export function initSocket(server) {
  if (!socket) {
    socket = new Socket(server);
  }
}
export function getSocketIO() {
  if (!socket) {
    throw new Error("Please call init first");
  }
  return socket.io;
}

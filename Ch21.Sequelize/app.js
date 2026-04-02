import express from "express";
import "express-async-errors";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import tweetsRouter from "./router/tweets.js";
import authRouter from "./router/auth.js";
import { config } from "./config.js";
import { initSocket } from "./connection/socket.js";
import { sequelize } from "./db/database.js";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("tiny"));

app.use("/tweets", tweetsRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

// sequelize.sync()를 통해서 데이터베이스 연결을 관리하는 풀을 생성
// 만약 데이터베이스가 존재하지 않으면 데이터베이스를 생성하는 역할 등을 한다
sequelize.sync().then(() => {
  const server = app.listen(config.host.port);
  initSocket(server);
});

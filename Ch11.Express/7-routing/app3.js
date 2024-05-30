import express from "express";
import userRouter from "./routes/user.js";
import postRouter from "./routes/post.js";

const app = express();

app.use(express.json());

// 이렇게 모듈 형식으로 app2.js를 개선한다
// 상위 root를 이런식으로 등록해준다
app.use("/users", userRouter);
app.use("/posts", postRouter);

app.listen(8080);

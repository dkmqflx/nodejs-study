import express from "express";
import fsAsync from "fs/promises";

const app = express();

// Express 5 버전 이후에는
// 아래처럼 return을 하거나 async await 해주면
// 미들웨어에서 별도의 에러 처리를 해주지 않아도
// 에러가 발생할 때 app.use의 "Something went wrong" 메시지가 출력된다
// 그래도 미들웨어에서 직접 에러를 처리해주는 것이 제일 좋다

app.get("/", (req, res, next) => {
  return fsAsync.readFile("/file2.txt").then((data) => res.send(data));
});

app.get("/", async (req, res, next) => {
  const data = await fsAsync.readFile("/file2.txt").catch(next);
  res.send(data);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: "Something went wrong" });
  next();
});

//github.com/expressjs/express/issues/2259#issuecomment-433586394
//github.com/blakeembrey/async-middleware

app.listen(8080);

// 버전 5 이하에서는: 'express-async-errors' 라이브러리를 설치하면 된다
// 상단에 아래처럼 import 를 선언해주면 위의 코드를 그대로 사용할 수 있다.
// import 'express-async-errors'

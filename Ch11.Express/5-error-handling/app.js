import express from "express";
import fs from "fs";
import fsAsync from "fs/promises";

const app = express();

app.use(express.json());

app.get("/file1", (req, res) => {
  // 1. 적절한 에러 처리를 한 예시
  // fs.readFile('/file1.txt', (err, data) => {
  //   if (err) {
  //     res.sendStatus(404);
  //   }
  // });

  // 2. 동기적인 경우 아래처럼 try - catch로 에러를 처리해준다
  try {
    const data = fs.readFileSync("/file1.txt"); // 동기적으로 처리, 파일을 읽을 때 까지 기다린다
  } catch (error) {
    res.sendStatus(404);
  }
});

// 비동기적인 경우에서도 에러 처리를 해준다.
app.get("/file2", (req, res) => {
  fsAsync
    .readFile("/file2.txt") //
    .catch((error) => {
      res.sendStatus(404);
    });
});

// 보통은 async - await 방식으로 처리한다
app.get("/file3", async (req, res) => {
  try {
    const data = await fsAsync.readFile("/file2.txt");
  } catch {
    res.sendStatus(404);
  }
});

// 기본적으로 각각의 미들웨어 안에서 적절하게 에러를 처리해주는 것이 좋지만
// 혹시 깜빡하고 에러를 처리하지 않았다면 use를 사용해서 에러를 한번에 처리할 수 있다

// 현재는 실수로 위처럼 프로미스에서 catch를 사용해서 에러를 처리하지 않았다면 에러가 발생하지만
// Express 5 부터는 아래와 같이 한번에 에러를 처리할 수 있게 된다.
// 현재는 아래처럼 작성된 코드는 프로미스는 에러를 처리 하지 못한다.
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: "Something went wrong" });
});

app.listen(8080);

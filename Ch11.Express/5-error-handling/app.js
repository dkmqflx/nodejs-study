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

// use를 사용해서 에러를 한번에 처리할 수 있다
// Express 5 부터는 이렇게
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: "Something went wrong" });
});

app.listen(8080);

import express from "express";

const app = express();

app.get(
  "/",
  (req, res, next) => {
    // next(); // 콜백함수를 이렇게 여러개 전달할 수 있고, 이 때 next() 함수를 호출해야지 다음 미들웨어로 넘어간다

    // next('router'); // 다음 미들웨어로 넘어가는게 아니라 다음 '/', 즉 아래에 있는 '/' 로 이동하게 된다

    // 에러를 던진다. 별도로 처리하지 않으면 사용자에게 그대로 전달이 된다
    // next(new Error('error'))

    res.send("<h1>Index page</h1>");
  },
  (req, res, next) => {
    res.send("<h1>Index page2</h1>");
  }
);

app.get("/", (req, res, next) => {
  res.send("<h1>Index page</h1>");
});

app.use((err, req, res, next) => {
  // 에러가 발생하면 처리해주어야 한다
  console.error("error!");

  // 사용자에게 500 에러와 메세지를 보내준다
  res.sendStatus(500).send("Sorry, try later!");
});

app.listen(8080);

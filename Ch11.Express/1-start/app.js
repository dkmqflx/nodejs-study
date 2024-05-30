import express from "express"; // package.json에 최신모듈로 사용한다고 type에 선언해주었다

const app = express();

app.get("/", (req, res, next) => {
  console.log("req", req);
  res.send("<h1>Index page</h1>");
});

app.get("/sky/:id", (req, res, next) => {
  // /sky/color?keyword=blue
  console.log("params", req.params); // { id: 'color' }
  console.log("query", req.query); // { keyword: 'blue'}
});

app.get("/hello", (req, res, next) => {
  // json을 보내는 방법
  res.setHeader("Content-Type", "application/json");
  res.status(200).json({ name: "Ellie", age: 0 });

  // 개별적으로 메세지 보낼 수 있다
  // res.status(201).send("created");

  // 이렇게 status code만 보낼수도 있다
  // res.sendStatus(400);
});

app.listen(8080);

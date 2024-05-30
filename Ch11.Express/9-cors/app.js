import express from "express";

const app = express();

// 아래처럼 설정을 해야지 CORS 에러를 해결할 수 있다.
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, DELETE"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("Welcome!");
});

app.listen(8080);

// 이렇게 하면 헤더이름을 기억하고 다 입력해야 하는 번거로움이 있다.
// cors라는 라이브러리를 사용하면 이를 해결할 수 있다.

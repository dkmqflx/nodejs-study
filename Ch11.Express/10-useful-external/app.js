import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors"; // cors 라이브러리 설치
import helmet from "helmet";

// http://expressjs.com/en/resources/middleware/morgan.html
const app = express();

// cookie-parser
// morgan
// cors
// helmet

// cookie-parser
// key: Cookie
// value: yummy_cookie=choco; tasty_cookie=strawberry

const corsOptions = {
  origin: ["http://localhost:3000"], // 특정한 도메인에서만 요청할 수 있도록
  optionsSuccessStatus: 200, // for options request에 대해 자동으로 200으로 응답하도록
  credentials: true, // Access-Control-Allow-Credentials: true
};
// 라이브러리 사용해서 cors 해결한다
app.use(cors(corsOptions));

// request 안에 있는 쿠키를 보기 위한 라이브러리
app.use(cookieParser()); // http://expressjs.com/en/resources/middleware/cookie-parser.html

// 사용자한테 요청을 받을 때 마다 무엇을 요청받았고 얼마나 걸렸는지와 같은 정보를 자동으로 로그로 남기고 싶을 때 사용한다
// 어떤 포맷으로 로그를 남길건지 인자로 전달해준다
app.use(morgan("common")); // http://expressjs.com/en/resources/middleware/morgan.html

// 공통적으로 보안에 필요한 헤더들을 추가해준다
// response header에서 확인할 수 있다.
app.use(helmet()); // https://github.com/helmetjs/helmet

app.get("/", (req, res) => {
  console.log(req.cookies); // it will be undefined without cookie-parser
  console.log(req.cookies.yummy_cookie);
  res.send("Welsome!");
});

app.listen(8080);

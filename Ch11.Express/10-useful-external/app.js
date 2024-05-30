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

app.use(cookieParser()); // http://expressjs.com/en/resources/middleware/cookie-parser.html
app.use(morgan("common")); // http://expressjs.com/en/resources/middleware/morgan.html

app.use(helmet()); // https://github.com/helmetjs/helmet

app.get("/", (req, res) => {
  console.log(req.cookies); // it will be undefined without cookie-parser
  console.log(req.cookies.yummy_cookie);
  res.send("Welsome!");
});

app.listen(8080);

import express from "express";
import { body, param, validationResult } from "express-validator"; // 유효성 검사를 깔끔하게 할 수 있는 라이브러리

const app = express();
app.use(express.json());

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next(); // 에러가 없다면 다음 미들웨어로 넘어간다
  }
  return res.status(400).json({ message: errors.array()[0].msg });
};

// 새로운 사용자를 만드는 요청
app.post(
  "/users",
  [
    body("name").trim().isLength({ min: 2 }).withMessage("이름은 두글자 이상!"),
    body("age").isInt().withMessage("숫자를 입력해"),
    body("email").isEmail().withMessage("이메일 입력해요").normalizeEmail(),
    body("job.name").notEmpty(),
    // 요청 핸들러 전에 유효성을 추가한 뒤 요청 핸들러에서 validationResult 객체를 통해 에러를 확인하고 에러를 처리해주는 형태로 사용한다
    validate,
  ], // 두번째 인자 핸들러는 배열로 묶어서 등록할 수 있다.
  (req, res, next) => {
    console.log(req.body);
    res.sendStatus(201);
  }
);

app.get(
  "/:email",
  [param("email").isEmail().withMessage("이메일 입력해요"), validate],
  (req, res, next) => {
    res.send("💌");
  }
);

app.listen(8080);

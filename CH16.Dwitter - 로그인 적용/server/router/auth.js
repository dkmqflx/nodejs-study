import express from "express";
import {} from "express-async-errors";
import { body } from "express-validator";
import { validate } from "../middleware/validator.js";
import * as authController from "../controller/auth.js";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

// 라우터에서 유효성 검사
const validateCredential = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("username should be at least 5 characters"),
  body("password")
    .trim()
    .isLength({ min: 5 })
    .withMessage("password should be at least 5 characters"),
  validate,
];

const validateSignup = [
  ...validateCredential,
  body("name").notEmpty().withMessage("name is missing"),
  body("email").isEmail().normalizeEmail().withMessage("invalid email"),
  body("url")
    .isURL()
    .withMessage("invalid URL")
    .optional({ nullable: true, checkFalsy: true }), // url은 필수가 아니다. nullable: true, checkFalsy: true는 url이 없어도 된다는 의미
  validate,
];
router.post("/signup", validateSignup, authController.signup);

router.post("/login", validateCredential, authController.login);

// 유효한 사용자인지 isAuth 미들웨어를 통해 확인한다
router.get("/me", isAuth, authController.me);
// isAuth 미들웨어 내부에서 next() 함수를 호출하기 때문에, 그 다음 순서인 authController.me가 실행될 수 있는 것
export default router;

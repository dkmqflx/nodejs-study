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

router.get("/me", isAuth, authController.me);

export default router;

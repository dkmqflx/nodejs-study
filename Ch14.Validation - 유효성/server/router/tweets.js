import express from "express";
import "express-async-errors";
import { body } from "express-validator";
import * as tweetController from "../controller/tweet.js";
import { validate } from "../middleware/validator.js";

const router = express.Router();

const validateTweet = [
  body("text")
    .trim()
    .isLength({ min: 3 })
    .withMessage("text should be at least 3 characters"),
  validate, // 유효성 검사를 controller에서 하는 것이 아니라 라우터에서 처리
];

// GET /tweet
// GET /tweets?username=:username
router.get("/", tweetController.getTweets);

// GET /tweets/:id -> 파라미터에 대해서는 따로 유효성 검사하지 않는다 -> 서버에서 찾을 수 없다는 에러 줄 것이기 때문
router.get("/:id", tweetController.getTweet);

// POST /tweeets
router.post("/", validateTweet, tweetController.createTweet);

// PUT /tweets/:id
router.put("/:id", validateTweet, tweetController.updateTweet);

// DELETE /tweets/:id
router.delete("/:id", tweetController.deleteTweet);

export default router;

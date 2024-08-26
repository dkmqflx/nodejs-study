import express from "express";
import "express-async-errors";
import * as tweetController from "../controller/tweet.js";
const router = express.Router();

// 이전 Ch12 코드에서는 한 파일 안에 모델(데이터)와 데이터를 처리하는 로직도 다 같이 작성되어 있다.
// 그렇기 때문에 다음과 같이 역할 별로 코드를 분리해준다.

// GET /tweets
// GET /tweets?username=:username
router.get("/", tweetController.getTweets);

// GET /tweets/:id
router.get("/:id", tweetController.getTweet);

// POST /tweeets
router.post("/", tweetController.createTweet);

// PUT /tweets/:id
router.put("/:id", tweetController.updateTweet);

// DELETE /tweets/:id
router.delete("/:id", tweetController.deleteTweet);

export default router;

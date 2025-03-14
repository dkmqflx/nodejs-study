import express from "express";
import "express-async-errors";

// 아직 데이터 베이스 없기 때문에 이렇게 메모리에 저장하도록 구현한다
// 이런식으로 서버에서 let 사용하는 것 좋지 않다.
let tweets = [
  {
    id: "1",
    text: "드림코더분들 화이팅!",
    createdAt: Date.now().toString(),
    name: "Bob",
    username: "bob",
    url: "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png",
  },
  {
    id: "2",
    text: "안뇽!",
    createdAt: Date.now().toString(),
    name: "Ellie",
    username: "ellie",
  },
];

// Router 생성
const router = express.Router();

// GET /tweets
// GET /tweets?username=:username
router.get("/", (req, res, next) => {
  const username = req.query.username;

  const data = username
    ? tweets.filter((tweet) => tweet.username === username)
    : tweets;

  res.status(200).json(data);
});

// GET /tweets/:id
router.get("/:id", (req, res, next) => {
  const id = req.params.id;

  const tweet = tweets.find((tweet) => tweet.id === id);

  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
});

// POST /tweeets
router.post("/", (req, res, next) => {
  const { text, name, username } = req.body;

  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    name,
    username,
  };

  tweets = [tweet, ...tweets];

  res.status(201).json(tweet);
});

// PUT /tweets/:id
router.put("/:id", (req, res, next) => {
  const id = req.params.id;
  const text = req.body.text;
  const tweet = tweets.find((tweet) => tweet.id === id);

  if (tweet) {
    tweet.text = text;
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
});

// DELETE /tweets/:id
router.delete("/:id", (req, res, next) => {
  const id = req.params.id;

  tweets = tweets.filter((tweet) => tweet.id !== id);

  res.sendStatus(204);
});

export default router;

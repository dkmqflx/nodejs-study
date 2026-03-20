import * as userRepository from "./auth.js";

// tweet에는 사용자 아이디만 가지고 있다 (data/auth.js)
let tweets = [
  {
    id: "1",
    text: "드림코더분들 화이팅!",
    createdAt: new Date().toString(),
    userId: "1",
  },
  {
    id: "2",
    text: "안뇽!",
    createdAt: new Date().toString(),
    userId: "1",
  },
];

// tweet과 user의 정보를 합쳐서 반환한다
export async function getAll() {
  return Promise.all(
    tweets.map(async (tweet) => {
      const { username, name, url } = await userRepository.findById(
        tweet.userId
      );
      return { ...tweet, username, name, url };
    })
  );
}

// username을 기준으로 필터링한다
export async function getAllByUsername(username) {
  return getAll().then((tweets) =>
    tweets.filter((tweet) => tweet.username === username)
  );
}

export async function getById(id) {
  const found = tweets.find((tweet) => tweet.id === id);
  if (!found) {
    return null;
  }
  const { username, name, url } = await userRepository.findById(found.userId);
  return { ...found, username, name, url };
}

export async function create(text, userId) {
  const tweet = {
    id: new Date().toString(),
    text,
    createdAt: new Date(),
    userId,
  };
  tweets = [tweet, ...tweets];
  return getById(tweet.id);
}

export async function update(id, text) {
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    tweet.text = text;
  }
  return getById(tweet.id);
}

export async function remove(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
}

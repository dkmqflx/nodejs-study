// 이렇게 역할별로 분리를 해주었기 때문에 나중에 데이터 베이스를 사용할 때 해당 파일만 수정을 해주면 된다

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

export async function getAll() {
  return tweets;
}

export async function getAllByUsername(username) {
  return tweets.filter((tweet) => tweet.username === username);
}

export async function getById(id) {
  return tweets.find((tweet) => tweet.id === id);
}

// 만드는 것도 모델에서 해준다.
export async function create(text, name, username) {
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    name,
    username,
  };

  tweets = [tweet, ...tweets];

  return tweet;
}

export async function update(id, text) {
  const tweet = tweets.find((tweet) => tweet.id === id);

  if (tweet) {
    tweet.text = text;
  }

  // tweet이 없다면 undefined로 리턴이 된다
  return tweet;
}

export async function remove(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
}

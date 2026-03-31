export default class TweetService {
  constructor(http, tokenStorage, socket) {
    this.http = http;
    this.tokenStorage = tokenStorage;
    this.socket = socket;
  }

  async getTweets(username) {
    const query = username ? `?username=${username}` : "";
    return this.http.fetch(`/tweets${query}`, {
      method: "GET",
      headers: this.getHeaders(),
    });
  }

  async postTweet(text) {
    return this.http.fetch(`/tweets`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ text, username: "ellie", name: "Ellie" }),
    });
  }

  async deleteTweet(tweetId) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });
  }

  async updateTweet(tweetId, text) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify({ text }),
    });
  }

  getHeaders() {
    const token = this.tokenStorage.getToken();
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  // 소켓 연결에서 tweets 이벤트 발생시 호출
  onSync(callback) {
    return this.socket.onSync("tweets", callback);
  }
}

// 1. 서버: "누가 트윗 썼다! tweets 이벤트 보낸다!" (emit)
// 2. Socket.js: "tweets 이벤트 왔네? 등록된 callback 실행해야지."
// 3. TweetService.js: "UI야, 여기 새 트윗 데이터(tweet) 왔다."
// 4. Tweets.jsx: "오, 새 데이터네? onCreated(tweet) 실행해서 화면에 보여줘야지!"

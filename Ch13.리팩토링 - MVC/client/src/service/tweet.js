// 이전 Ch.12 코드의 반복되는 코드를 별도의 클래스로 만들어서 처리해주었다.
// src/network/http.js

export default class TweetService {
  constructor(http) {
    this.http = http;
  }

  async getTweets(username) {
    const query = username ? `?username=${username}` : "";
    return this.http.fetch(`/tweets${query}`, {
      method: "GET",
    });
  }

  async postTweet(text) {
    return this.http.fetch(`/tweets`, {
      method: "POST",
      body: JSON.stringify({ text, username: "ellie", name: "Ellie" }),
    });
  }

  async deleteTweet(tweetId) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: "DELETE",
    });
  }

  async updateTweet(tweetId, text) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: "PUT",
      body: JSON.stringify({ text }),
    });
  }
}

export default class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async fetch(url, options) {
    // 공통적으로 필요한 것 추가해주었다.
    const res = await fetch(`${this.baseURL}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    let data;

    try {
      data = await res.json();
    } catch (error) {
      // response에 body가 없는 경우에도 에러가 발생할 수 있으므로
      // 로그만 찍고 넘어가도록 한다.
      console.error(error);
    }

    // 200대 아니면 에러 던진다.
    if (res.status > 299 || res.status < 200) {
      const message =
        data && data.message ? data.message : "Something went wrong! 🤪";

      throw new Error(message);
    }
    return data;
  }
}

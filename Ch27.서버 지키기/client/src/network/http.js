import axios from "axios";
import axiosRetry from "axios-retry";

const defaultRetryConfig = {
  retries: 5,
  initialDelayMs: 100,
};

// https://github.com/axios/axios
export default class HttpClient {
  constructor(
    baseURL,
    authErrorEventBus,
    getCsrfToken,
    config = defaultRetryConfig // config는 외부에서 전달된 설정을 사용하거나, 기본값을 사용한다.
  ) {
    this.authErrorEventBus = authErrorEventBus;
    this.getCsrfToken = getCsrfToken;

    // axios 인스턴스 생성
    this.client = axios.create({
      baseURL: baseURL,
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    // axios-retry 설정
    // https://github.com/softonic/axios-retry
    axiosRetry(this.client, {
      retries: config.retries,

      // 재시도 딜레이
      retryDelay: (retry) => {
        const delay = Math.pow(2, retry) * config.initialDelayMs; // 100, 200, 400, 800, 1600
        const jitter = delay * 0.1 * Math.random(); // 10, 20, .... 160
        return delay + jitter;
      },

      // 429 에러가 발생하면 재시도
      retryCondition: (err) =>
        // IdempotentRequest 란 동일한 요청을 여러번 보내도 상관없는 요청이라면 재시도를 해도 상관없다는 것
        axiosRetry.isNetworkOrIdempotentRequestError(err) ||
        err.response.status === 429,
    });
  }

  async fetch(url, options) {
    const { body, method, headers } = options;
    const req = {
      url,
      method,
      headers: {
        ...headers,
        "_csrf-token": this.getCsrfToken(),
      },
      data: body,
    };

    try {
      const res = await this.client(req);
      return res.data;
    } catch (err) {
      // 에러 처리
      if (err.response) {
        const data = err.response.data;

        const message =
          data && data.message ? data.message : "Something went wrong! 🤪";
        throw new Error(message);
      }
      throw new Error("connection error");
    }
  }
}

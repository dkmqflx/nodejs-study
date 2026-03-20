const TOKEN = "token";

// 브라우저 스토리지에 저장하는 것은 안전하지 않다
// 다만 기본 백엔드 과정을 넘어서기 때문에 이후에 보너스 챕터에서 알려줄 것
export default class TokenStorage {
  saveToken(token) {
    localStorage.setItem(TOKEN, token);
  }

  getToken() {
    return localStorage.getItem(TOKEN);
  }

  clearToken() {
    localStorage.clear(TOKEN);
  }
}

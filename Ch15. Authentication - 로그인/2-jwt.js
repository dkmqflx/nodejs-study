const jwt = require("jsonwebtoken");

const secret = "fSTWh2471^%Vw9dmUyYR$BXL*VJhq&N&"; // 시크릿 키

// 아무렇게나 만들 수 있지만
// www.lastpass.com/password-generator 같은 사이트 이용해서 더 안전하게 만들 수 있다
// 권고되는 size는 32 charactor, 엄밀히 말하면 256bit니까 32byte

const token = jwt.sign(
  {
    id: "ellie",
    isAdmin: false,
  }, // payload, 너무 커지면 네트워크 비용이 커질 수 있으므로 정말 필요한 내용만 넣을 수 있도록 한다
  secret,
  { expiresIn: 2 } // 토큰 유효 시간, 2초
); // 토큰 생성

setTimeout(() => {
  // 토큰을 검증한다
  jwt.verify(token, secret, (error, decoded) => {
    console.log(error, decoded); // 3초가 지났으므로 에러가 발생한다.
  });
}, 3000);

console.log(token);

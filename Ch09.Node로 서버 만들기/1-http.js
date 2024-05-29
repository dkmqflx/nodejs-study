const http = require("http"); // 서버 만들기 위해서는 노드에서 제공하는 http 모듈을 사용해야 한다
const fs = require("fs");
// const http2 = require('http2'); // http2도 사용할 수 있다. http2 는 https와 함께 적용이 된다.

console.log(http.STATUS_CODES);
console.log(http.METHODS);

// 서버를 만든다
const server = http.createServer((req, res) => {
  console.log("incoming...");
  console.log(req.headers);
  console.log(req.httpVersion);
  console.log(req.method);
  console.log(req.url);

  res.write("welcome"); // 화면에 welcome 텍스트가 보인다
  res.end();
});

server.listen(8080); // 어떤 포트에서 서버를 구동할 것인지

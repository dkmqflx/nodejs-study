const http = require("http"); // 서버 만들기 위해서는 노드에서 제공하는 http 모듈을 사용해야 한다
const fs = require("fs");
// const http2 = require('http2'); // http2도 사용할 수 있다. http2 는 모든 브라우저에서 https와 함께 적용이 된다.
// 개발 pc에는 https를 위한 SSL certificate가 없다. 물론 받아서 브라우저에 인증을 하면 되지만 복잡할 수 있으므로
// 개발할 때는 http 사용하고 배포할 때 https 사용한다

console.log(http.STATUS_CODES);
console.log(http.METHODS);

// 서버를 만든다
const server = http.createServer((req, res) => {
  console.log("incoming...");
  console.log(req.headers);
  console.log(req.httpVersion);
  console.log(req.method);
  console.log(req.url);

  const url = req.url;

  res.setHeader("Content-Type", "text/html"); // html 파일을 보내겠다고 헤더에 선언

  if (url === "/") {
    fs.createReadStream("./html/index.html").pipe(res);
  } else if (url === "/courses") {
    fs.createReadStream("./html/courses.html").pipe(res);
  } else {
    fs.createReadStream("./html/not-found.html").pipe(res);
  }
});

server.listen(8080); // 어떤 포트에서 서버를 구동할 것인지

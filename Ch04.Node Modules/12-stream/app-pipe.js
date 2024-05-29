const fs = require("fs");
const zlib = require("zlib");

const readStream = fs.createReadStream("./file.txt");

const zlibStream = zlib.createGzip(); // 압축할 수 있는 모듈

const writeStream = fs.createWriteStream("./file4.zip");

// 스트림에서 데이터를 읽어오면서 그대로 연결하는 것
// readStream의 데이터를 받아서 writeStream로 연결
const piping = readStream.pipe(zlibStream).pipe(writeStream);

piping.on("finish", () => {
  console.log("done!!");
});

// 파이핑은 서버를 만들때도 도움이 된다
const http = require("http");

// 서버를 만들고
const server = http.createServer((req, res) => {
  // 아래처럼 하면 서버에서 파일을 다 읽은 다음에 데이터를 보내준다
  // fs.readFile("file.txt", (err, data) => {
  //   res.end(data);
  // });

  // 이렇게 하기보다 스트림을 파이핑으로 연결해준다
  const stream = fs.createReadStream("./file.txt");
  stream.pipe(res);
});
server.listen(3000);

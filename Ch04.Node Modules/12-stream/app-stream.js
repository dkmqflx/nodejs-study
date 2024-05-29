const fs = require("fs");

// 스트림 생성
const readStream = fs.createReadStream("./file.txt", {
  //   highWaterMark: 8, // 기본값: 64 kbytes, 한번에 얼마만큼 데이터를 읽어올지
  //   encoding: 'utf-8',
});

const beforeMem = process.memoryUsage().rss;
const data = [];

// on은 데이터가 발생할 때마다 콜백함수를 실행하지만
// once 딱 한번만 콜백함수를 실행한다
// 예를들어  highWaterMark: 8,로 옵션을 두면 딱 8 kbytes만 읽고 끝이난다

readStream.once("data", (chunk) => {
  // console.log(chunk);
  data.push(chunk);
  console.count("data"); // 데이터가 몇번 출력되는지 확인할 수 있다.
  readStream.close();
});

// close 실행되면 실행된다.
readStream.on("close", () => {
  console.log(data.join(""));
  // calculate
  const afterMem = process.memoryUsage().rss;
  const diff = afterMem - beforeMem;
  const consumed = diff / 1024 / 1024;
  console.log(diff);
  console.log(`Consumed Memory: ${consumed}MB`);
});

readStream.on("error", (error) => {
  console.log(error);
});

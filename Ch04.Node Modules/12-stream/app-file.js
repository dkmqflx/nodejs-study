const fs = require("fs");

// 💩
const beforeMem = process.memoryUsage().rss; // 사용하고 있는 메모리 상태를 저장

fs.readFile("./file.txt", (_, data) => {
  // 파일을 다 읽은 다음에 file2라는 새로운 파일에 저장한다.
  fs.writeFile("./file2.txt", data, () => {});

  // calculate, 실제로 메모리 사용에 얼마나 큰 변화가 있는지 그 차이점을 MB로 출력한다
  const afterMem = process.memoryUsage().rss;
  const diff = afterMem - beforeMem;
  const consumed = diff / 1024 / 1024;

  console.log(diff);
  console.log(`Consumed Memory: ${consumed}MB`);

  // 약 19MB 정도를 사용했다.
  // 이렇게 모든 파일을 다 읽어온 다음에 쓰는 것은 비효율적
  // 하지만 스트림을 사용하면 버퍼별로 하나 읽고 쓰고 이것을 반복하면서 순차적으로 데이터를 처리할 수 있다.
});

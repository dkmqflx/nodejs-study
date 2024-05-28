const process = require("process");
// 현재 동작하고 있는 노드 프로세스에 대한 정보 가져오는 모듈

console.log(process.execPath);
console.log(process.version);

console.log(process.pid);
console.log(process.ppid); // 프로세스 부모에 대한 id

console.log(process.platform); // 플랫폼에 대한 정보
console.log(process.env); // 컴퓨터에 저장된 모든 환경 변수에 대한 정보

console.log(process.uptime()); // 얼마나 실행되고 있었는지
console.log(process.cwd()); // 경로
console.log(process.cpuUsage()); // cpu 사용량

setTimeout(() => {
  console.log("setTimeout");
}, 0);

// 지금은 아닌데 현재 수행되고 있는 코드가 완료된 다음 내가 등록한 콜백함수를 태스크 큐에 넣어 달라고 말할 때 사용한다
process.nextTick(() => {
  console.log("nextTick");
});

for (let i = 0; i < 100; i++) {
  console.log("for loop");
}

// 아래 순서로 출력된다
// for loop
// nextTick
// setTimeout

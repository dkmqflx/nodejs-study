const os = require("os");

// 운영체제마다 EOL이 다른 경우 있다
console.log(os.EOL === "\n"); // 맥의 경우 true
console.log(os.EOL === "\r\n"); // 윈도의 경우 true

console.log(os.totalmem()); // 총 메모리 사이즈
console.log(os.freemem()); // 사용 가능한 메모리 사이즈

console.log(os.type());
console.log(os.userInfo());
console.log(os.cpus());
console.log(os.homedir());
console.log(os.hostname());

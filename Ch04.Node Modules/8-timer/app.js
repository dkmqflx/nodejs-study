let num = 1;

// 1초 단위로 숫자를 1씩 증가시킨다
const interval = setInterval(() => {
  console.log(num++);
}, 1000);

// 6초 후에 인터벌을 취소시킨다
setTimeout(() => {
  console.log("Timeout!");
  clearInterval(interval);
}, 6000);

let count = 0;

function increase() {
  count++;
}

function getCount() {
  return count;
}

// 다른 곳에서 해당 모듈을 사용하기 위해서 이렇게 exports 해주어야 한다
// 아래처럼 하면 increase, getCount 함수만 외부에 노출이 되고 count 변수는 노출되지 않는다
module.exports.getCount = getCount;
module.exports.increase = increase;

console.log(module.exports === exports);

// exports = {};
// console.log(module.exports === exports);
exports.increase = increase;

console.log(module); // 모듈에 대한 정보를 볼 수 있다.

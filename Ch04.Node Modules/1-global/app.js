const fs = require("fs");
// 아래의 global이 node의 전역객체라는 것을 알려주기 위해 노드 모듈을 불러온 것
// 아래의 global 클릭하면 이제 타입으로 이동하게 된다

console.log(global); // node에는 global 이라는 전역객체가 있다. 브라우저에서는 window가 전역객체

// hello 라는 함수를 새로 추가
global.hello = () => {
  global.console.log("hello"); // console도 global에 있는 것을 사용하는 것
};

global.hello();
hello();

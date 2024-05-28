function hello() {
  console.log(this);
  console.log(this === global); // true
  // 함수안에서 this는 global이다
}

hello();

class A {
  constructor(num) {
    this.num = num;
  }

  memberFunction() {
    console.log("----- class -----");
    console.log(this);
    console.log(this === global); // false
    // 클래스 안에 있는 함수의 this는 클래스를 가리킨다
  }
}

const a = new A(1);
a.memberFunction();

console.log("--- global scope ---");
console.log(this); // {}
console.log(this === module.exports); // true
// 브라우저와 달리 노드에서 함수 안도, 클래스 안도 아닌 경우에 this는 빈 객체 {}가 나온다
// 즉, module.exports와 동일하다

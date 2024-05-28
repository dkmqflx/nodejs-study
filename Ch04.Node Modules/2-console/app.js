console.log("logging...."); // cmd와 함께 console 클릭하면 정의가 되어있는 곳으로 이동한다
console.clear();

// log level,
// 이렇게 level 별로 나누어야지 에러인지를 빠르게 파악할 수 있다.
// 그리고 배포할 때 level 별로 로그를 보여줄지 말지를 컨트롤할 수도 있다.
console.log("log"); // 개발
console.info("info"); // 중요한 정보에 대해 남기고 싶을 때
console.warn("warn"); // 경보 (그렇게 치명적인 에러는 아님)
console.error("error"); // 심각한 에러, 사용자 에러, 시스템 에러

// assert,
// 참이 아닌 경우에만 로그가 출력된다
console.assert(2 === 3, "not same!");
console.assert(2 === 2, "same!");

// print object
const student = { name: "ellie", age: 20, company: { name: "AC" } };

console.log(student);

console.table(student); // 테이블 형태로 보기 편하게 출력

console.dir(student, { showHidden: true, colors: false, depth: 0 });
// 옵션을 전달해서 추가적으로 컨트롤 할 수 있다.
// https://nodejs.org/docs/latest/api/console.html#consoledirobj-options

// measuring time, 성능을 확인할 때 사용하면 좋다
console.time("for loop");
for (let i = 0; i < 10; i++) {
  i++;
}

console.timeEnd("for loop"); // 끝날 때 까지 얼마나 걸렸는지 확인할 수 있다.

// counting, 내가 예상한 횟수 만큼 호출되었는지
function a() {
  console.count("a function");
}

a(); // 1
a(); // 2

console.countReset("a function"); // count를 초기화한다

a(); // 1

// trace, 디버깅할 때 유용하다
function f1() {
  f2();
}

function f2() {
  f3();
}

function f3() {
  console.log("f3");
  console.trace();
}

f1();

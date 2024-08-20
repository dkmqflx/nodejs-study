const fs = require("fs");
// 파일 시스템 모듈 가져온다
// 파일에서 기본적으로 할 수 있는 모든 동작들을 fs 모듈에서 제공해준다

// 모든 API는 3가지 형태로 제공된다
// 1. rename(...., callback(error, data))
// 필요한 인자, 콜백함수 전달해주면 필요한 일 끝난 다음 비동기적으로 콜백함수 동작한다

// 2. try { renameSync(....) } catch(e) { },
// blocking, 따로 콜백함수 전달하고 해당 작업이 끝나기 전까지 다른 줄로 넘어가지 않는다
// 그렇기 때문에 가급적 사용하지 않는게 좋다
// 따로 에러 처리 상황에 대한 걸 전달하지 않기 때문에 항상 try catch 문으로 감싸서 사용한다

// 3. promises.rename().then().catch(0)
// promise 형태로 사용할 수 있다.

// 동기적 방법
try {
  fs.renameSync("./text.txt", "./text-new.txt");
} catch (error) {
  console.error(error);
}

// 비동기적 방법
fs.rename("./text-new.txt", "./text.txt", (error) => {
  console.log(error);
});
console.log("hello"); // 성공한 경우에만 hello가 출력된다

fs.promises
  .rename("./text2.txt", "./text-new.txt") //
  .then(() => console.log("Done!"))
  .catch(console.error);

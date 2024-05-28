## 4.2 노드 관련 필수사이트 북마크 하기 🔖

- 북마크

  - 노드 입문자를 위한 심플한 사이트: https://nodejs.dev/en/learn/

  - 노드 공식 사이트: https://nodejs.org/en/docs/

---

## 4.3 글로벌 오브젝트 - 소스 공부법

- Globals

  - https://nodejs.org/docs/latest/api/globals.html

- 윈도우나 VSCode 최신 버전에서 Node 타입 정의 파일이 업데이트 되었어요 :)

- 저와 다르게 아래와 같이 global 정의가 나와도 놀라지 마세요.

  ```js
  declare var global: typeof globalThis;
  ```

  - [globals.global.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/9d59b7aadafb5ee2afac9c4440b82e692a7449c1/types/node/globals.global.d.ts)

- 저는 @types/node_version 15로 사용하고 있고, 위와 같이 나오신다면 아마 여러분들은 버전 16 이상을

- 사용하고 계실거예요.

- 타입 정의 여기서 확인해 보세요: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/9d59b7aadafb5ee2afac9c4440b82e692a7449c1/types/node/globals.d.ts#L97

<br/>

### Q. global vs globalThis의 차이

- 에디터에서 global을 치면 추천으로 globalThis가 나와 찾아봤는데요,

- 전역 객체에 접근할 때 웹에서는 window,

- Web Workers에서는 self,

- Node에서는 global

- 각기 다른 이름으로 접근해야 했던 것을 하나의 이름으로 통일하고자 만든 새로운 표준이 globalThis라고 합니다.

- 그래서 globalThis를 사용하면 Node에서 global을 쓴 것과 동일하고 브라우저에서 window를 쓴 것과 동일하다고 하네요!

- 이 링크에 자세한 설명이 있습니다

  - https://blog.logrocket.com/what-is-globalthis-why-use-it/

### A.

---

## 4.6 모듈 (export, require)

아래처럼 처음 선언할 때는 module을 생략해서 할당할 수 있다.

```js
module.exports.getCount = getCount;

exports.increase = increase;

console.log(module);
console.log(module.exports === exports); //  true
```

- exports는 module.exports를 참조하는, 참조값을 가지고 있다

- 이를 통해서 등록할 수 있는 것

- 하지만 아래처럼 exports에 다른 값을 할당하면

- module.exports에 값이 등록되지 않는 것을 확인할 수 있다

```js
module.exports.getCount = getCount;

exports = {};

exports.increase = increase; // 빈 객체에 등록

console.log(module);
console.log(module.exports === exports); //  false
```

- 그렇기 때문에 module 키워드를 생략하고 exports에 바로 값을 등록하는 것은 위험하다

---

## 4.7 2015 최신 모듈 (export, import)

- common.js가 아니라 자바스크립트에서 자체적으로 지원하는 module을 사용할 것이라고 선언

```json
  "type": "module",
```

---

## 4.9 process (프로세스) 정보

### Q.

- nextTick이 단순히 nextTick의 콜백 함수를 태스크 큐에 넣는데 그치는게 아니라, 태스크 큐에서 대기 중인 콜백들 중에서 가장 선처리 될 수 있도록 강제하는 것이라는 거죠?

### A.

- 그렇죠 👍👍 정확해요!

- 현재 블럭 안에 있는 코드가 다 실행되고 나서 비동기적으로 나중에 실행되길 원할때 (즉, 태스크 큐에 넣고 다음줄로 바로 넘어가길 원할때) 쓸 수 있는 방법이 setTimeout과 nextTink이 있어요.

- 차이점은 setTimeout(() => { }, 0) 이건 태스크 큐 제일 끝으로 넣어주는 반면

- nextTick은 큐 제일 앞으로 넣어줘서, 가능한 제일 빨리 실행될 수 있도록 해주죠

---

## 4.10 타이머와 콜스택의 연관

- 아래와 같은 코드 실행하게 되면

```js
console.log("code1");
setTimeout(() => {
  console.log("setTimeout 0");
}, 0);

console.log("code2");
setImmediate(() => {
  console.log("setImmediate");
});

console.log("code3");
process.nextTick(() => {
  console.log("process.nextTick");
});
```

- 다음과 같은 순서로 출력된다

```shell

code1
code2
code3

process.nextTick # 태스크 큐의 우선순위 제일 높으므로
setTimeout 0
setImmediate

```

- setTimeout과 setImmediate는 거의 동일

<br/>

- 아래 코드는 코드를 실행하는데 얼마나 걸리지 알아보기 위한 코드

```js
console.log("code1");
console.time("timeout 0");

setTimeout(() => {
  console.log("setTimeout 0");
  console.timeEnd("timeout 0");
}, 0);

/**
 * code1
 * setTimeout 0
 * timeout 0: 3.015ms
 * /

```

- 즉, 정확히 0초가 보장되지 않는다. 콜스택이 텅텅비어있을 때 까지 기다려야 하기 때문

---

## 4.12 file 동기와 비동기 그리고 프로미스

---

## 4.13 file - 다양한 사용법

---

## 4.14 버퍼와 스트림 👫 베스트 프렌드

---

## 4.15 버퍼, 제대로 알아보기

---

## 4.16 스트림의 매력

---

## 4.17 파이프 ǂ

---

## 4.18 노드의 중요 포인트! 이벤트 🎪

---

## 4.19 재사용성이 높은 이벤트 클래스 만들기

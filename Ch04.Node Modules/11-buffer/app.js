// Fixed-size chuck of memory
// 버퍼라고 하는 것은 우리 메모리에서 고정된 사이즈의 메모리 덩어리라고 할 수 있다

// array of integers, byte of data
// 배열의 형태
const fs = require("fs"); // 선언된 정의로 가기 위해 선언

const buf = Buffer.from("Hi"); // 버퍼 생성
console.log(buf); // 유니코드 형태로 출력된다 <Buffer 48 69>
console.log(buf.length); // 2
console.log(buf[0]); // 72, 배열의 형태로 접근하게 되면 아스키코드 형태로 출력된다
console.log(buf[1]); // 105
console.log(buf.toString()); // Hi
// 문자열 형태로 변환한다
// 인코딩 형태 옵션으로 전달할 수 있다. 기본값은 utf-8

// create
// 위처럼 문자열이 아닌 직접 버퍼를 만든다
const buf2 = Buffer.alloc(2); // 메모리 덩어리를 찾아서 초기화시켜준다
const buf3 = Buffer.allocUnsafe(2); // fast, 조금 더 빠르다
// 메모리 덩어리를 찾지만 초기화 시키지 않는다
// 즉, 메모리가 많이 사용되고 있는 상황에서
// 기존에 다른 데이터가 들어있으나 사용하지 않는 메모리라면 공간은 확보하지만 초기화는 하지 않는다

buf2[0] = 72;
buf2[1] = 105;
buf2.copy(buf3);
console.log(buf2.toString()); // Hi
console.log(buf3.toString()); // Hi

// concat, 여러가지 버퍼를 모을 수 있다.
const newBuf = Buffer.concat([buf, buf2, buf3]);
console.log(newBuf.toString()); // HiHiHi

## 9.3 HTML 컨텐츠 보내주기

### Q.

- res.write로 작성할 때는 왜 res.end()를 해야지만 작동하고 pipe.(res)로 할 때는 res.end()를 하지 않아도 되나요?

### A.

- pipe 내부에서 자동으로 처리해 주기 때문입니다

<br/>

- readFile vs createReadStream

  - https://www.geeksforgeeks.org/difference-between-readfile-and-createreadstream-in-node-js/

### Q.

- createReadStream.pipe() 를 이용한 HTML 가져오기 실습에서

- 코드의 마무리 부분에 res.end(); 를 호출했을때는 내용이 불러와지지 않고, res.end()를 생략했을때는 HTML 내용이 정상적으로 localhost에 표시가 되는데

- 왜 이런 차이가 생기는지 궁금합니다!

### A.

- 앞선 강의에서 설명해주신 것처럼 스트림은 기본적으로 Event Driven 형태로 구현되어 있어요.

  - 파일을 읽으면서 중간중간 이벤트가 발생하고, 최종적으로는 end 이벤트를 호출하게 됩니다. 그리고 res 객체는 내부적으로 WriteStream을 상속하고 있고, 이는 end 메서드를 포함하고 있습니다.

  - 제 생각에는 end 이벤트가 발생했을때 내부적으로 호출하는 메서드가 res.end() 메서드와 동일하기 때문에, 스트림을 읽는 도중에 end 메서드를 호출하면 스트림을 읽는 작업이 완료되기 전에 작업을 해당 끝내버려서 정상적인 결과를 얻지 못하는 것 같습니다.

- 정확하게 잘 설명해 주셨어요~ :) 조금만 덧붙이자면 pipe는 비동기적인 함수 이므로, 호출만 해놓고 (작업이 끝나길 기다리지 않고) 다음 코드 라인으로 넘어가죠.

  - 그래서 piping이 되고 있는 중간에 res.end를 호출하게 되면 파이핑이 멈추게 된답니다.

  - pipe이 끝나면 자동으로 end() 처리가 되므로, 수동적으로 호출해줄 필요는 없어요 🙌

---

## 9.4 템플릿 엔진 EJS 사용해보기 (서버사이드 렌더링)

<img src='./images/Ch09/01.png'>

- Templating Engines을 이용하면 html 처럼 생긴 문서의 뼈대만 구성해 놓고

- 즉 템플릿만 만들어 놓고 클라이언트가 요청하면 요청에 맞게 페이지를 동적으로 만들어서 클라이언트에게 보내줄 수 있다

- 그 중에서도 EJS가 보편적으로 사용된다

- 순수 자바스크립트 되어있을 때는 Templating Engines 사용해도 상관없지만 조금 더 복잡한 서버 사이드 렌더링 하려면 Next.js 같은 프레임워크 사용한다

- Reference

  - [EJS](https://ejs.co/)

---

## 9.5 JSON 보내주기 (그리고 왜?)

- 위의 두 방법을 통해서는 웹 브라우저로 html 파일만 보내줄 수 있다

- 서버가 안드로이드, 아이폰과 같은 다른 클라이언트에서 다른 목적으로 서버에 있는 데이터를 가져오기 위해서는 json과 같은 다른 형식의 데이터를 보내줄 수 있는 서버를 만들어주어야 한다

<br/>

- 브라우저에서는 포스트 요청을 확인할 수 있는 방법이 없기 때문에 포스트맨을 통해서 확인한다

- http://localhost:8080/courses로 포스트 요청을 보내본다

<br/>

### Q.

- console.log(chunk)할때 string이 아니라 버퍼가 출력되는 이유가 chunk가 json 이여서 그런건가요?

### A.

- chunk가 아직 json으로 변환하지 않은, 완전한 데이터의 완전체가 아닌, 부분적인 데이터, 바로 버퍼이기 때문이예요 :)

<br/>

### Q.

- 1️⃣const course = JSON.parse(Buffer.concat(body).toString())

- data이벤트 발생시 body.push(chunk)로 body[0]에 입력한 버퍼값이 있음을 배웠습니다.

```js
body: [{ name: "new-course" }]; //원래는 버퍼 유니코드 형태
```

- ❓그런데 1️⃣에서 굳이 concat을 하는지는 모르겠습니다.😂

- ❓body[0]만 해도 괜찮은지 궁금합니다.

- ❓혹은 concat의 진정한 용도가 무엇인지 궁금합니다.

- 만약 body에 여러 chunk가 있는 상황일 경우 concat을 사용하면 JSON파싱이 안됩니다...

- 예를들어`body=[{"n1":"nn"}, {"n2":"nn}]`일 경우 (원래는 버퍼값으로 유니코드 형태)

```js

JSON.parse(Buffer.concat(body).toString())// =>에러발생!

//{"n1":"nn"}{"n2":"nn"}
^
```

- ❓body에 여러 chunk가 있을 때에 파싱이 가능한 방법이 있는지도 궁금합니다!

### A.

- 우선, body는 어떤 데이터를 보관하고 있나요?

- body는 Post 요청 바디에 있는 데이터를 부분적으로 받아온 (버퍼)를 배열로 저장해 두고 있어요. 즉 body === Buffer[] === 버퍼 배열

- 이렇게 리스트의, 배열의 버퍼를 하나의 버퍼로 묶어서(연결해서) 만들 수 있는 API가 Buffer.concat() 입니다 :)

  - https://nodejs.org/api/buffer.html#static-method-bufferconcatlist-totallength

### A.

- 현재 상황에서는 body 배열에 length를 찾아보면 1이 나옵니다.

- 버퍼 하나만 들어가 있는 거죠.

- 그래서 저도 직접 해보니까 질문자님이 말씀하신것 처럼 concat 메소드를 사용하지 않고 body[0]을 직접 json으로 파싱해서 해도 똑같이 동작하였습니다.

- 그래서 이런 상황에서는 굳이 concat 사용할 필요는 없어보입니다. 필요하다면 왜 인지 저도 궁금하네요.

- 하지만 body 배열에 버퍼가 여러개 들어가는 상황에서는 concat으로 합치는게 필요하겠네요.

```js
on(event: 'data', listener: (chunk: any) => void): this;
```

- 그런데 req.on 이벤트 내부 타입정의를 확인해보면 chunk가 여러개 들어가는 상황은 없을 것으로 보이네요.

- 분명 버퍼가 다수라 concat이 필요한 상황이 있겠지만 적어도 post메소드(아니면 http 메소드 전부 다 이런 것일지도 모르겠습니다.)로 데이터 서버에서 받을 때는 body에 chunk가 여러개가 들어갈 상황은 없을 것 같습니다.

### A.

- 위의 경우 말씀처럼 concat을 쓰지 않아도 잘 작동합니다. 왜냐하면 강의에서 사용한 데이터의 크기가 약 20byte 정도 되는 작은 크기이기 때문입니다. 하지만 실제 현업 서버에서 통신하는 내용이 굉장히 클 경우가 많겠죠.

- 보통 Node.js에서 사용하는 기본 버퍼 사이즈는 앞서 나온 강의 내용대로 기본값(default)이 64KB(65536byte) 입니다.

- 현업에서는 64KB 이상의 사진, 동영상, 긴 글 등 용량이 큰 데이터를 주고 받기 때문에 Node.JS 및 강의에서 강의 내용처럼 Buffer가 당연히 여러 개 버퍼들(Multiple instance of buffers)을 결국 하나의 버퍼로 합치는 과정이 필요합니다.

- 그런데 지금 우리끼리 test하는 환경이 아닌 실제 사용자가 POST로 작은 데이터를 전달해줄 것이라고 예측하고 concat을 생략하는건.... 얼마나 큰 데이터가 올지 알 수 없습니다.

- 그래서 위와 같은 방식 Buffer.concat(body) 어떤 정형화된 방식을 쓰라고 권장하는 것 같습니다.

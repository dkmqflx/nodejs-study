const logger = require("./logger.js");

const emitter = new logger.Logger();

emitter.on("log", (event) => {
  console.log(event); // log라는 이벤트가 발생하면 콜백함수를 실행하도록 한다.
});

emitter.log(() => {
  console.log("..... ꝍ loopings ꝍ....");

  for (let i = 0; i < 5; i++) {
    console.log("count", i);
  }
});

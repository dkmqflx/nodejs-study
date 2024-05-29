const EventEmitter = require("events");
const emitter = new EventEmitter();

const callback1 = (args) => {
  console.log("first callback - ", args);
};

// ellie라는 이벤트가 발생하면 콜백함수를 실행하도록 한다
emitter.on("ellie", callback1);

emitter.on("ellie", (args) => {
  console.log("second callback - ", args);
});

// emit 사용해서 이벤트를 발생시킬 수 있다.
emitter.emit("ellie", { message: 1 });
emitter.emit("ellie", { message: 2 });

// 등록된 모든 콜백함수를 제거한다
emitter.removeAllListeners();

// 하나만 제거할 수 도있다.
// emitter.removeListener("ellie", callback1);

emitter.emit("ellie", { message: 3 }); // 출력되지 않는다

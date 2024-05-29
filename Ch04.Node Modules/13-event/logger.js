const EventEmitter = require("events");

// 기존에 EventEmitter에 log라는 함수가 더해진 클래스
class Logger extends EventEmitter {
  log(callback) {
    this.emit("log", "started...");

    callback();

    this.emit("log", "ended!");
  }
}

module.exports.Logger = Logger;

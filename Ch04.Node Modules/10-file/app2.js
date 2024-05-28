const fs = require("fs").promises; // 기본적으로 promise를 가져오도록 한다

// reading a file
fs.readFile("./text.txt") //
  .then((data) => console.log(data)) // 파일을 읽어올 때 버퍼 형태로 일겅온다
  .catch(console.error);

// reading a file
fs.readFile("./text.txt", "utf8") //
  .then((data) => console.log(data)) // utf로 인코딩된 형태로 볼 수 있다.
  .catch(console.error);

// writing a file
fs.writeFile("./file.txt", "Hello, Dream Coders! :) ") //
  .catch(console.error);

fs.appendFile("./file.txt", "Yo!, Dream Coders! :) ") // 기존에 데이터는 유지하면서 뒤에 추가한다
  .catch(console.error);

// copy
fs.copyFile("./file.txt", "./file2.txt") //
  .catch(console.error);

// folder
fs.mkdir("sub-folder") // 폴더 생성
  .catch(console.error);

// 해당하는 경로에 있는 모든 파일을 배열 형태로 읽어올 수 있다.
fs.readdir("./") // 현재 경로에 있는 모든 파일을 읽어온다
  .then(console.log)
  .catch(console.error);

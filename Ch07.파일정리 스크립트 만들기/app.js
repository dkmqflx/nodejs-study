const path = require("path");
const os = require("os");
const fs = require("fs");

// nodemon app.js test // 이렇게 실행한다

// 계획
// 1. 사용자가 원하는 폴더의 이름을 받아온다
const folder = process.argv[2]; // 테스트 하고자 하는 폴더 이름

// 우리가 작업하고자 하는 폴더 만들어준다
const workingDir = path.join(os.homedir(), "Pictures", folder);

//  폴더 없거나 존재 하지 않는 경로라면
if (!folder || !fs.existsSync(workingDir)) {
  console.error("Please enter folder name in Pictures");
  return;
}

// 2. 그 폴더안에 video, captured, duplicated 폴더를 만든다
const videoDir = path.join(workingDir, "video");
const capturedDir = path.join(workingDir, "captured");
const duplicatedDir = path.join(workingDir, "duplicated");

// 폴더가 없으면 폴더를 만들도록 한다
!fs.existsSync(videoDir) && fs.mkdirSync(videoDir);
!fs.existsSync(capturedDir) && fs.mkdirSync(capturedDir);
!fs.existsSync(duplicatedDir) && fs.mkdirSync(duplicatedDir);

// 3. 폴더안에 있는 파일들을 다 돌면서 해당하는 mp4|mov는 vidoe로, png|aae는 captured로, IMG_1234 (IMG_E1234)는 duplicated로 이동시킨다
fs.promises
  .readdir(workingDir) //
  .then(processFiles)
  .catch(console.log);

function processFiles(files) {
  files.forEach((file) => {
    // 반복문 돌면서 해당하는 디렉토리로 파일을 옮긴다
    if (isVideoFile(file)) {
      move(file, videoDir);
    } else if (isCapturedFile(file)) {
      move(file, capturedDir);
    } else if (isDuplicatedFile(files, file)) {
      move(file, duplicatedDir);
    }
  });
}

function isVideoFile(file) {
  const regExp = /(mp4|mov)$/gm; // mp4 또는 mov로 파일이 끝난다면
  const match = file.match(regExp);
  return !!match;
}

function isCapturedFile(file) {
  const regExp = /(png|aae)$/gm;
  const match = file.match(regExp);
  return !!match;
}

function isDuplicatedFile(files, file) {
  // IMG_XXXX  -> IMG_EXXX (EXXX가 수정된 버전)

  // 수정된 버전이 아닌 원본 파일만 받아오도록 한다
  if (!file.startsWith("IMG_") || file.startsWith("IMG_E")) {
    return false;
  }

  // 원본파일을 수정한, E가 추가된 파일이 있는지 찾는다
  const edited = `IMG_E${file.split("_")[1]}`;
  const found = files.find((f) => f.includes(edited));

  return !!found;
}

function move(file, targetDir) {
  console.info(`move ${file} to ${path.basename(targetDir)}`);

  const oldPath = path.join(workingDir, file);
  const newPath = path.join(targetDir, file);

  fs.promises
    .rename(oldPath, newPath) // 기존의 경로를 새로운 경로로 변경해주면 된다
    .catch(console.error);
}

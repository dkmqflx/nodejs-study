const path = require("path");
// 노드는 컴퓨터위에서 동작하기 때문에 파일 시스템에 접근하기가 정말 좋다
// 그럴 때 사용하는게 path
// 파일의 경로에 대해 접근하거나 경로에 대해 처리할 때 유용하게 사용할 수 있는 라이브러리

// 운영체제에 따라 표기되는 법이 다르다
// POSIX (Unix: Mac, Linux): 'Users/temp/myfile.html'
// Windows: 'C:\\temp\\myfile.html'
// 그렇기 때문에 경로를 하드코딩하면 안된다

console.log(__dirname);
// 글로벌 객체에 있는 디렉토리 이름
// 현재 수행되고 있는 디렉토리 이름 출력된다

console.log(__filename);
// 글로벌 객체에 있는 파일이름
// 현재 수행되고 있는 파일 이름 포함해서 출력된다

console.log(path.sep); // 경로 구분자는 무엇인지
console.log(path.delimiter); // 환경변수 구분자는 무엇인지

// basename
console.log(path.basename(__filename)); // 파일 이름만 읽어온다
console.log(path.basename(__filename, ".js")); // 확장자까지 제거한다

// dirname
console.log(path.dirname(__filename)); // 디렉토리 이름만 가져온다

// extension
console.log(path.extname(__filename)); // 확장자만 가져온다

// parse
const parsed = path.parse(__filename); // 전체 경로를 하나하나 분리한다
console.log(parsed); // 객체 형태로 출력된다

parsed.root;
parsed.name;

const str = path.format(parsed); // string 형태로 변환한다
console.log(str); // 경로가 string 형태로 출력된다

// isAbsolute
console.log("isAbsolute?", path.isAbsolute(__dirname)); // /Users/로 시작하므로 false
console.log("isAbsolute?", path.isAbsolute("../")); // true

// normalize
console.log(path.normalize("./folder////////sub")); // 이상한 경로인 경우 알아서 고쳐준다
// folder/sub 로 알아서 수정해준다

// join

console.log(__dirname + "/" + "image"); // 이렇게 하면 윈도우에서는 이상한 경로가 된다

console.log(__dirname + path.sep + "image"); // 운영체제별로 다른 구분자 사용하도록

console.log(path.join(__dirname, "image")); // join 사용하면 더 간편하게 사용할 수 있다.
// https://nodejs.org/api/path.html#pathjoinpaths

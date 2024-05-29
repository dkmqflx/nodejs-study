## 5.1 NPM 챕터 소개

- NPM은 Node Package Manager로 라이브러리 관리자

> Bring the best of open source to you, your team, and your company
> Relied upon by more than 17 million developers worldwide, npm is committed to making JavaScript development elegant, productive, and safe. The free npm Registry has become the center of JavaScript code sharing, and with more than two million packages, the largest software registry in the world. Our other tools and services take the Registry, and the work you do around it, to the next level.

- npm init 명령어를 통해 package.json 파일을 만들 수 있다

- npm install 명렁어로 필요한 라이브러리를 설치할 수 있다.

- 라이브러리 추가하면 node_modules가 설치가 되고 npm repository에서 해당 라이브러리의 소스코드를 node_modules로 가져오게 된다

- npm을 설치하면 자동으로 따라오는 npx 라는게 있다

- NPX

  - bundled with npm 5.2+

  - tool for executing packages

- npm은 특정한 라이브러리를 다운로드 받아서 설치하는 개념이라면

- npx는 따로 라이브러리를 우리 pc에 저장하지 않고 바로 실행할 수 있게 해준다

- 따라서 개별적으로 실행가능한 자바스크립트 툴이나 스크립트가 있다면 npx를 사용해서 이용할 수 있다

---

## 5.2 NPM 시작하기

- NPM 명령어: https://docs.npmjs.com/cli/v7/commands

```shell

npm

npm -v

npm init # --yes

```

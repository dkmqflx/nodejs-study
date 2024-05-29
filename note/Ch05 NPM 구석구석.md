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

---

## 5.3 소프트웨어 라이센스란? 꿀사이트 🔖

- package.json에는 license라는 필드가 있다

  ```json
  {
    "license": "ISC"
  }
  ```

- 영상에서 언급된 라이센스 관련 사이트:

  - https://spdx.org/licenses/

    - 라이센스 종류에 대해 알아볼 수 있다.

  - https://www.olis.or.kr/license/Detailselect.do?lType=spdx&lId=1074

- 라이브러리로 제공할 때 제품을 만드는 것은 괜찮지만 수정해서 재배포하면 안된다 이런 것들을 명시할 때 적절한 라이센스를 사용하면 된다

---

## 5.4 라이브러리 버전관리? 꿀사이트 🔖

- 프로젝트 배포할 때 버전 정보 중요하다

```json
{
  "version": "0.1.0"
}
```

- 버전 정보는 Major.Minor.Patch로 나누어진다 (1.0.0)

- 보통 프로젝트는 메이저 버전 1부터 시작한다

- 프로젝트에 버그가 발생하거나 사소한 오류를 잡을 때는 패치 정보를 업데이트 한다

- 조금 더 정보가 추가되거나 작은 기능들이 추가되면 마이너 버전을 업데이트 한다

- 기존의 제품에서 정말 다른 기능이 대거 수정되거나 추가되거나 1.0.0에 동작하는 기능에 변경사항이 발생하면 메이저 버전을 업데이트 해야 한다

```json
"dependencies": {
  "my_dep": "^1.0.0", // 메이저 버전만 고정하고 마이너, 패치는 어떤 버전도 다 받겠다.
  "another_dep": "~2.2.0" // 메이저, 마이너는 고정하고 패치는 어떤 버전도 다 받겠다.
},
```

- 영상에서 언급된 버전 관련 사이트:

  - https://docs.npmjs.com/about-semantic-versioning

  - https://semver.npmjs.com/

---

## 5.5 글로벌로 설치 하고 목록 확인

- 이전에는 npm install --save 옵션 명시해주어야 했는데 npm 5 이상부터는 --save 옵션 명시해주지 않아도 된다

```shell

npm i -h

npm i -g netlify # 내 컴퓨터에 전체적으로 필요한 라이브러리인 경우 글로벌로 컴퓨터 전체에 설치한다

npm list -h

npm list

npm list -g # 글로벌로 설치된 패키지

npm list -g --dept=0 # 라이브러리가 설치한 다른 라이브러리 까지 보고 싶지 않다면 뎁스 설정한다
```

- 🚨 중요 노트

  - npm에서 글로벌로 패키지를 설치하실때 왠만하면 sudo(파워 권한)로 설치 하시지 않는게 좋아요. 보안에 안전하지 않아서 최대한 피해야 한답니다 😱

  - npm에서 무언가 설치하실때 권한 이슈가 나오면 아래와 같이 해보세요:

  - sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}

  - https://stackoverflow.com/questions/47252451/permission-denied-when-installing-npm-modules-in-osx/47252840

---

## 5.6 프로젝트 라이브러리 확인, 설치 및 삭제

```shell

npm view underscore # view 명령어를 통해 특정한 라이브러리에 대한 정보를 볼 수 있다

npm i underscore

```

- node_modules 보면 underscore라는 라이브러리 설치된 것과 소스코드를 다운로드 받은 것을 볼 수 있다.

- package-lock.json를 통해 정확한 버전의 라이브러리를 사용했는지 알 수 있다.

```shell

npm uninstall underscore # 라이브러리 삭제

```

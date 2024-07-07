<br>
<br>

<p align="center">
  <img src="/assets/vaco.png"  width="400">
</p>

<br>
<br>

> 바닐라코딩의 모든 과제는 실제 기업에서 주어지는 과제에 기반하여 제작되었으며, 저작권법의 보호를 받습니다. 개인 블로그 등의 공개된 장소에 관련 내용을 공유하거나 개인적으로 지인들과 공유하는 등의 행위는 삼가해주시기 바랍니다.

<br>
<br>

# Async JavaScript Utils

비동기 자바스크립트 유틸리티 함수들을 직접 구현해보는 과제입니다.

<br>
<br>

## 📌 작업 준비

과제를 시작하기 전, 아래 1-3 단계를 진행합니다. 과제를 시작하는 단계에서 최초 1회만 진행하시면 됩니다.

<br>

### 1. 과제 클론받기

터미널에서 아래의 Git 명령어를 이용하여 과제를 클론(다운로드) 받으세요.

```sh
git clone 과제_GIT_URI
```

> 과제\_GIT_URI는 Github 과제 저장소의 메인 페이지에서 초록색 `<> Code` 버튼을 클릭하시면 확인할 수 있습니다.

<br>

### 2. 과제 디렉토리로 이동하기

다음 명령어를 이용하여 과제 디렉토리로 이동하세요.

```sh
cd 과제_저장소_이름
```

<br>

### 3. 관련 의존성 패키지를 설치하세요.

터미널의 과제 디렉토리 내에서 아래 명령어를 실행하세요.

```sh
npm install
```

> `package.json`의 `engines` 필드에 명시된 Node.js와 npm 버전을 확인하신 후, 동일한 버전을 사용해주세요.

<br>
<br>

## 📌 작업 진행

<br>

### 1. VS Code 실행

터미널에서 과제 디렉토리로 이동하여 아래 명령어를 실행하면, VS Code에서 과제 파일이 열립니다.

```sh
code .
```

> [VS Code에서 `code` 명령어 설치하는 방법](https://code.visualstudio.com/docs/setup/mac#_launching-from-the-command-line)

<br>

### 2. 로컬 테스트 명령어 실행

터미널에서 과제 디렉토리로 이동하여 아래 명령어를 실행하세요.

```sh
npm test
```

> 실행 명령어는 과제에 따라 상이할 수 있으므로, 반드시 `README.md` 파일의 내용을 확인 후 진행해주세요.

<br>

### 3. 로컬 테스트 중지

과제 작업이 끝났을 경우, 터미널 실행창에서 `ctrl + c`를 입력하여 실행 중이던 명령어를 중지합니다. 추후 작업 재개시, 명령어를 다시 실행하고, 작업 종료시 명령어를 중지시키는 행위를 매번 반복합니다.

> 명령어를 장시간 동안 켜놓을 경우, 컴퓨터의 리소스가 낭비될 수 있습니다. 장시간 작업을 중단하는 경우에는 명령어를 종료시키고 다시 재개하는 시점에 다시 명령어를 시작하세요.

<br>
<br>

## 📌 리서치 TODO

> 과제 제출 이후, 조사하고 실험한 퀴즈나 내용을 정리하여 공유해주세요.

<br>

- [ ] 이번 과제에서는 작성해야 할 함수들이 여러 개 주어져 있습니다. 주어진 함수들 중, 아래 함수들에 대해 실제 로직을 작성하기 전에 의사 코드를 먼저 작성해 보세요. 그 외의 함수들도 가능하다면, 의사 코드를 작성해보도록 시도해보세요.
  - `parallel`
  - `waterfall`
  - `each`
  - `map`
  - `memoize`
  - `reduce`

<br>

### 과제 제출 후

- [ ] 이벤트 룹은 다음 두 가지 자료만 모두 이해할 수 있다면 충분합니다. 번역하고 이해한 내용을 동료들과 함께 논의해보세요.
  - 이벤트 룹 기초 영상: [JSConf: What the heck is the event loop anyway?](https://youtu.be/8aGhZQkoFbQ?feature=shared)
  - 이벤트 룹 고급 영상: [JSConf: Jake Archibald on the web browser event loop](https://youtu.be/cCOL7MC4Pl0?feature=shared)
- [ ] 프러미스는 콜백 지옥을 해결하는 것이 주된 목적이 아닙니다. 프러미스에 대한 다음 글을 번역하고, 이해한 내용을 동료들과 함께 논의해보세요.
  - [Domenic Denicola: You're missing the point of Promises](https://gist.github.com/domenic/3889970)
- [ ] 프러미스, `async`, `await` 등이 사용된 실제 예시 코드나 퀴즈 등을 찾아보고 실행 순서를 잘 이해했는지 확인해보세요.

<br>
<br>

## 📌 과제 구현사항 TODO

- [ ] `spec/01_XXX.spec.js` ~ `spec/07_XXX.spec.js` 테스트 코드를 참고하여 `src/01_async.js` 파일에 내용 작성이 필요한 함수들의 로직을 작성합니다.
- [ ] `src/02_async_await.js` 파일의 가이드에 따라 리팩터링을 진행합니다.
- [ ] 추가적인 테스트 코드를 작성해보세요.

<br>

### 참고자료

- [Async](http://caolan.github.io/async/v3/)

<br>

### 제약사항

안타깝지만 이번 과제에서 아래에 나열된 메소드는 사용할 수 없습니다. 🥸

- `Array.prototype.indexOf`
- `Array.prototype.lastIndexOf`
- `Array.prototype.findIndex`
- `Array.prototype.at`
- `Array.prototype.find`
- `Array.prototype.forEach`
- `Array.prototype.includes`
- `Array.prototype.slice`
- `Array.prototype.map`
- `Array.prototype.reduce`
- `Array.prototype.reduceRight`
- `Array.prototype.filter`
- `Array.prototype.every`
- `Array.prototype.some`
- `Array.prototype.flat`
- `Array.prototype.sort`

<br>
<br>

## 📌 참고 사항

과제를 수행하실 때, 작성한 코드가 정상적으로 반영이 되지 않는다고 생각되는 경우에는 아래를 참고해주세요.

<br>

### 해결 방법 1. 크롬 인터넷 사용 기록 삭제 후 재시도

1. 크롬 브라우저 오른쪽 상단의 `...` (세로로 된 점 3개) 버튼
2. 설정
3. 개인정보 및 보안
4. 인터넷 사용 기록 삭제

<br>

### 해결 방법 2. 크롬 시크릿 창에서 재시도

1. 크롬 브라우저 오른쪽 상단의 `...` (세로로 된 점 3개) 버튼
2. 새 시크릿 창

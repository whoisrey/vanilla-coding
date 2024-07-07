> HTML, CSS, JavaScript로 Quick Sort Algorithms Visualizer 만들기 과제입니다.
QuickSort를 구현하면서 pivot을 정하는 기준으로 Hoare 방식을 사용하였습니다.

## ☑️ 프로젝트 명세
- [x] 화면에 사용자가 숫자를 입력할 수 있는 입력칸이 있어야 합니다.
- [x] 입력칸에는 최소 5개에서 최대 10개의 숫자를 입력할 수 있고, 중복되지 않는 정수만 입력 가능합니다.
- [x] 입력값이 위 조건에 맞지 않는 상태에서 Enter 키를 입력할 경우, 입력칸 아래에 구체적인 오류 메시지를 보여주어야 합니다.
  - 중복된 숫자에 대한 오류 메시지, 정수가 아닌 숫자에 대한 오류 메시지 등
- [x] 오류 메시지가 표기된 상태에서 사용자가 입력값을 수정하기 시작할 경우, 오류 메시지는 사라져야 합니다.
- [x] 사용자가 유효한 입력값을 입력하고 Enter 키를 입력할 경우, 정렬 알고리즘의 진행 절차가 시각적으로 표현되어야 합니다. 
- [x] 시각화 절차가 진행 중인 상태에서는 입력칸의 입력값을 변경할 수 없도록 비활성화 되어야 합니다.
- [x] 시각화 절차가 종료된 상태에서는 입력칸이 재활성화 되어 사용자는 입력값을 변경하고 다시 시각화를 시작할 수 있어야 합니다.

</br>

## 🗂️ 폴더 구조
```
┣ assets
┣ node_modules
┣ src
┣ 📄 scripts
┃ ┣ constants.js
┃ ┣ index.js
┃ ┗ linkedList.js
┣ 🎨 styles
┃  ┣ reset.css
┃  ┣ style.css
┣ .gitignore
┣ .npmrc
┣ 📜 index.html
┣ package-lock.json
┣ package.json
┣ README.md
┗ vitest.config.js
  
```
* `scripts/linkedList` : linkedList 생성 함수
* `scripts/index` : 이외 모든 자바스크립트 코드
* `styles/reset` : 스타일 초기화
* `styles/style` : 모든 스타일 코드

</br>

## 🕹️ 기능 구현

|👇🏽 정수입력 | 👇🏽 중복 미허용 | 
|-----------|-------------|
|<img src="https://github.com/vanillacoding/fullstack-bootcamp17-w07/assets/106927728/1710b7c4-c7e4-4ab4-b73a-56569a40ae84" width="350px" alt="정수입력"> | <img src="https://github.com/vanillacoding/fullstack-bootcamp17-w07/assets/106927728/a078dc04-1dad-4808-8974-271736f194f7" width="350px" display="inline" alt="중복미허용"> |

| 👇🏽 갯수 제한 | 👇🏽 input 범위 제한 (0~20) |
|----------|-----------|
|<img src="https://github.com/vanillacoding/fullstack-bootcamp17-w07/assets/106927728/b5fc0970-ed40-430d-8423-af62fe2e7daa" width="350px" display="inline" alt="갯수제한"> | <img src="https://github.com/vanillacoding/fullstack-bootcamp17-w07/assets/106927728/ee2f3d52-cd6f-4017-9d3e-662c974823b6" width="350px" alt="인풋범위"> |

| 📽️ visualization 📽️ |
|-------------|
| <img src="https://github.com/vanillacoding/fullstack-bootcamp17-w07/assets/106927728/52ac7d95-cf3c-4392-97a0-bb3e577ba725" width="400px" alt="시각화"> |

</br>

## 📅 과제 진행 일정
|  | 월 | 화 | 수 | 목 | 금 |
|--|--|--|--|--|--|
| 내용 | 개념 공부 | 의사 코드 | 코드 작업 | 코드 작업 | 리팩토링 |
| 세부 내용 | 정렬 알고리즘 | QuickSort | 구조화, 유효성검사 | 시각화 |  

<br/>

## ✍️ 커밋 컨벤션
🎉 `Init` : 프로젝트 생성

✨ `Feat` : 새로운 기능 구현

🐛 `Fix` : 버그 수정

🎨 `Style` : 코드 포맷팅

✅ `Test` : 테스트 코드 관련

💡 `Comment` : 주석 관련 

🚚 `Move` : 파일 구조 생성 및 변경

♻️ `Refactor` : 코드 리팩토링 (아래 명시한 두 가지 레벨 리팩토링 포함)
- Low Level Refactoring
- High Level Refactoring

</br>

## 질문있습니다 ❗️
### CSS파일을 JavaScript 파일에 import 하게될 경우, 장단점을 조사하였는데, 상충되는 부분을 제대로 이해했는지 궁금합니다.

1. 장점
- 렌더링할 때 모든 CSS를 파싱하는 것보다 필요한 부분만 파싱해서 렌더링을 진행하기 때문에 렌더링시 초기 페이지 로딩 속도가 빠르다.

2. 단점
- JavaScript에 import되어 있는 CSS가 처음 렌더링할 때 필요한 CSS를 가지고 있다면, 해당 JavaScript가 실행이 되야 CSS를 불러올 수 있기 때문에 초기 페이지 로딩 속도에 악영향을 미칠 수 있다.
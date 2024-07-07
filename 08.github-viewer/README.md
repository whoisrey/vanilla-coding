> React를 활용하여 GitHub Repo 검색 및 Repo 팔로워 수 대결 페이지 구현 과제입니다.
## 🛠️ 최적화
### 수정내용
1. Promise 객체를 반환하는 **두 개의 함수**를 <ins>순차적으로</ins> 실행하여 각각 fulfill되거나 reject 될 때까지 함수의 실행을 기다렸다면 
👉🏼 **두 개의 함수**를 <ins>동시에</ins> 실행하여 기다릴 수 있도록 `Promise.all()` 메서드를 이용하였습니다. 
2. Promise 객체를 반환하는 두 개의 함수가 실행된 값을 <ins>각각 변수</ins>에 저장했다면
👉🏼 구조 분해 할당을 활용하여 두 개의 변수를 <ins>하나의 배열</ins>에 저장했습니다.

### 수정코드
[getUserData](https://github.com/vanillacoding/fullstack-bootcamp17-w10/blob/c239ba9a198e66a670437506316136f9b3dcf1d0/src/utils/api.js#L68-L80)
[battle](https://github.com/vanillacoding/fullstack-bootcamp17-w10/blob/c239ba9a198e66a670437506316136f9b3dcf1d0/src/utils/api.js#L86-L94)

## 📽️ 기능 구현 (시연)
|👇🏽 [화면 1] (언어 선택) | 👇🏽 [화면 1] (로딩 중) |
|-----------|-----------|
| <img src="https://github.com/vanillacoding/fullstack-bootcamp17-w10/assets/106927728/d5babc04-b6d2-46da-8d17-e94cd1a7609a" width="350px" alt="정수입력"> | <img src="https://github.com/vanillacoding/fullstack-bootcamp17-w10/assets/106927728/7c080496-cca0-483c-ade7-43333b33845a" width="350px" display="inline" alt="중복미허용"> | 

|👇🏽 [화면 2] | 👇🏽[공통 사항] (상태 저장) | 
|-----------|-----------|
| <img src="https://github.com/vanillacoding/fullstack-bootcamp17-w10/assets/106927728/3d0feb9b-c654-40a5-8195-52dfb4437958" width="350px" display="inline" alt="중복미허용"> | <img src="https://github.com/vanillacoding/fullstack-bootcamp17-w10/assets/106927728/3d0feb9b-c654-40a5-8195-52dfb4437958" width="350px" display="inline" alt="중복미허용"> | 

## ☑️ 기능 구현 (체크리스트)
### [화면 1] 인기 저장소

- [x] 사용자가 선택할 수 있는 언어가 주어져야 합니다. (`src/constants/languages.js` 참고)
- [x] 사용자가 한 가지 언어를 선택할 수 있어야 합니다.
- [x] 저장소 데이터를 가져오는 동안에는 Loading 컴포넌트가 화면에 보여져야 합니다.
- [x] 사용자가 선택한 언어에 대한 인기 저장소가 나열되어야 합니다. (`/src/utils/api.js` 참고)
- [x] 나열된 인기 저장소 목록은 각 인기 저장소에 대한 저장소 이름, 소유자, 깃헙 저장소 링크, 팔로워 수, 포크 수를 반드시 보여주어야 합니다.
- [x] Github 대결 화면으로 이동할 수 있는 버튼이 있어야 합니다.

<br>

### [화면 2] Github 대결

- [x] 정확히 2개의 Github 사용자 이름을 입력할 수 있는 입력 칸이 주어져야 합니다.
- [x] 2개의 사용자 이름을 모두 입력하지 않은 경우, 대결을 진행할 수 없어야 합니다.
- [x] 대결을 진행할 경우, 입력받은 2명의 Github 사용자 데이터를 비교하여 승자를 표기해야 합니다. (`/src/utils/api.js` 참고)
- [x] 사용자 데이터를 가져오는 동안에는 Loading 컴포넌트가 화면에 보여져야 합니다.
- [x] 승자 판별에 대한 연산이 완료된 후에는 화면에 각 사용자에 대해 아래와 같은 정보를 보여주어야 합니다.
  - 승패 여부
  - 프로필 사진
  - 점수
  - Github Username
  - 이름
  - 지역
  - Followers Count
  - Following Count
  - Repository Count

<br>

### 공통사항

- [x] "인기 저장소"에서 "Github 대결"로 이동하여 대결 진행 후, 다시 "인기 저장소"로 돌아왔다가 "Github 대결"로 돌아간다면, 바로 이전에 진행했던 Github 대결 결과가 보여져야 합니다. (리액트 상태 이용)
- [x] 클래스 기반 컴포넌트로 작업되어 있는 `<Loading />` 컴포넌트를 함수형 컴포넌트로 수정하세요.
- [x] `utils/api.js`에 있는 `getRepos`와 `getProfile` 함수의 내용을 `fetch API`를 활용하여 개선해보세요.
- [x] `utils/api.js`에는 최적화가 가능한 로직이 있습니다. 찾아보도록 하세요.
- [ ] `<Loading />` 컴포넌트에 대한 Unit Test를 추가하여 보완하세요. (`/spec/Loading.spec.js`)

<br/>


## 🗂️ 폴더 구조
```
🗂️cypress
┣ 📁e2e
┣ 📁fixtures
┗ 📁support
🗂️src
┣ 📁assets
┃ ┣ 📂icons
┃ ┗ 📂logo
┣ 📁components
┃ ┣ 📂App
┃ ┃ ┗ 📂NavButton
┃ ┗ 📂Battle
┃ ┃ ┣ 📂UserInput
┃ ┃ ┗ 📂BattleList
┃ ┃   ┗ 📂BattleCard
┃ ┣ 📂Popular
┃ ┃ ┣ 📂LangButton
┃ ┃ ┗ 📂CardList
┃ ┃   ┗ 📂Card
┃ ┗ 📂Splash
┃ ┃ ┣ 📂Error
┃ ┃ ┗ 📂Loading
┣ 📁constants
┣ 📁spec
┣ 📁utils
┣ main.jsx
┗ setupTests.js
```

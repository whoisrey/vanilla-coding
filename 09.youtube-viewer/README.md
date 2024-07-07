> React를 활용한 Youtube Video List 페이지 구현 과제입니다.
## 📽️ 기능 구현 (시연)

|👇🏽 [화면 1] (초기 화면) | 👇🏽 [화면 2] (검색) |👇🏽 [화면 3] (모달) |
|-----------|-----------|------------|
| <img src="https://github.com/vanillacoding/fullstack-bootcamp17-w11/assets/106927728/a8e1bee4-07ac-47a5-b335-975df013251b" width="220px" alt="초기화면">  | <img src="https://github.com/vanillacoding/fullstack-bootcamp17-w11/assets/106927728/e1a49446-943c-4c2f-9718-232c2b2a7c80" width="220px" alt="검색">  |   <img src="https://github.com/vanillacoding/fullstack-bootcamp17-w11/assets/106927728/480980ee-f5d7-4a94-a340-bc5da4a34901" width="220px" alt="모달"> |

## ☑️ 기능 구현 (체크리스트)
### [화면 1] 영상 목록 UI (URL: `/`)

- [x] 초기 진입 시, 랜덤하게 선정된 영상 목록을 최소 10개 보여주어야 합니다.
- [x] 초기 진입 시, 영상 목록은 5개씩 최소 2줄(5 X 2) 이상을 보여주어야 합니다.
- [x] 각 영상에 대하여 최소한 아래 정보들을 보여주어야 합니다.
  - [x] 영상 제목
  - [x] 영상 대표 이미지
  - [x] 영상 업로드 날짜
  - [x] 영상 설명 (30 글자 이상일 경우, 생략 처리합니다.)
  - [ ] 그 외 개인적으로 추가하고 싶은 사항
- [ ] 사용자가 페이지 하단(혹은 유사한 기준)으로 스크롤 했을 경우, 기존 영상 목록 하단에 영상들을 추가해주어야 합니다.
- [x] 사용자가 영상 목록의 영상을 클릭할 경우, 화면 2로 이동합니다.
- [x] 사용자가 검색어를 입력할 수 있는 입력창이 있어야 합니다.
- [x] 사용자가 검색어를 입력하고 엔터 키를 입력할 경우, 기존 영상 목록은 모두 사라지고 검색어에 대한 영상 목록을 보여주어야 합니다.
- [ ] 사용자가 검색한 결과를 보여주는 경우, 페이지 URL에 검색어를 쿼리 파라미터로 추가해주어야 합니다. 예) `/?q=javaScript`
- [ ] 검색어가 포함된 URL(예: `/?q=javaScript`)로 초기 진입할 경우, 랜덤한 영상 목록이 아닌 검색 결과 목록을 보여주어야 합니다.
- [x] 빈 공백을 입력하고 엔터 키를 입력할 경우, 검색어를 다시 확인해 달라는 의미의 오류 메시지가 표기되어야 합니다.
- [x] 오류 메시지는 Modal 형태의 UI로 보여주어야 합니다.
- [x] 오류 메시지 Modal의 크기는 전체 화면 크기보다 작은 사이즈여야 하고, Modal 외곽 영역을 클릭할 경우 Modal은 닫히도록 합니다.
- [x] 오류 메시지 Modal의 우측 상단에는 X 버튼이 있어야 합니다. X 버튼을 클릭할 경우 Modal은 닫히도록 합니다.
- [ ] Modal을 닫을 경우 나타나는 영상 목록은 Modal을 열기 전 상태의 기존 영상 목록, 기존 스크롤 위치가 그대로 유지된 상태로 보여야 합니다.

<br>

### [화면 2] 영상 상세 정보 Modal UI (URL: `/:videoId`)

- [ ] 사용자가 선택한 영상에 대하여 최소한 아래 정보들을 보여주어야 합니다.
  - [x] 영상 제목
  - [x] 영상 업로드 날짜
  - [x] 영상 설명 전문
  - [x] 재생 가능한 형태의 영상
  - [ ] 그 외 개인적으로 추가하고 싶은 사항
- [x] Modal의 크기는 전체 화면 크기보다 작은 사이즈로 보여주고, Modal 외곽 영역을 클릭할 경우 Modal은 닫히고 화면 1로 이동합니다.
- [x] Modal의 우측 상단에는 X 버튼이 있어야 합니다. X 버튼을 클릭할 경우 Modal은 닫히고 마찬가지로 화면 1로 이동합니다.
- [ ] Modal을 닫을 경우 나타나는 화면 1의 영상 목록은 Modal을 열기 전 상태의 기존 영상 목록, 기존 스크롤 위치가 그대로 유지된 상태로 보여야 합니다.
- [x] `/:videoId` URL로 직접 진입할 경우에 대한 별도의 기술적인 대응은 하지 않습니다.

<br>

## 🗂️ 폴더 구조
```
🗂️cypress
┣ 📁e2e
┣ 📁fixtures
┗ 📁support
🗂️src
┣ 📁assets
┃ ┣ finder.png
┃ ┣ premium.png
┃ ┣ vaco.png
┃ ┗ youtube.png
┣ 📁common
┃ ┣ ButtonStyle.jsx
┃ ┣ ContainerStyle.jsx
┃ ┣ FormStyle.jsx
┃ ┣ InputStyle.jsx
┃ ┣ MainStyle.jsx
┃ ┗ utils.js
┣ 📁header
┃ ┣ Header.jsx
┃ ┣ HeaderStyle.jsx
┃ ┗ SearchInput.jsx
┣ 📁modal
┃ ┣ ErrorModal.jsx
┃ ┣ ErrorModalStyle.jsx
┃ ┣ VideoModal.jsx
┃ ┗ VideoModalStyle.jsx
┣ 📁video-list
┃ ┣ VideoList.jsx
┃ ┣ VideoListStyle.jsx
┃ ┣ VideoListEntry.jsx
┃ ┗ VideoListEntryStyle.jsx
┣ App.jsx
┣ index.jsx
┗ setupTests.js
```

## 📌 커밋 컨벤션
| 태그 이름 | 설명 |
|---------|-----|
| Feat | 새로운 기능을 추가하는 경우 |
| Refactor | 코드 리팩토링 (Low & High) |
| Design | CSS 등 사용자 UI 디자인 변경 |
| Style | 코드 포맷 변경, 세미 콜론 누락 |
| Move | 파일 구조를 변경하는 경우 |
| Add | 새로운 파일을 추가하는 경우 |
| Remove | 파일을 삭제하는 경우 |
| Chore | 패키지 매너지를 설정하는 경우, 초기 빌드 업데이트 |
| Comment | 주석 추가 및 변경 |

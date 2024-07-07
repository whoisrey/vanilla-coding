## 📅 일정
|  | 월 | 화 | 수 | 목 | 금 |
|--|--|--|--|--|--|
| 개념공부 | 참조 | 참조, 복사 | 프로토타입 | 프로토타입  | 제출 |
| 과제진행 | 메서드 조사  | 테스트 코드 개념 | 코드 작성 | 리팩토링 | 리팩토링 |
- 메서드 조사 : lodash 메서드와 비슷한 기능을 하는 MDN에서 나온 메서드 기능 비교
- 테스트 코드 개념 : 테스트 코드를 살펴보면서 모르는 개념이 등장하는 경우, 함께 숙지
- 코드 작성 : 각자 pseudo 코드 작성을 먼저 진행하고 서로 비교한 뒤, 함께 코드를 작성
- 리팩토링 : 지난 주 오피스아워 및 2주차 코드리뷰 때 받았던 피드백을 토대로 코드 개선 작업 진행

## ✍️ 커밋 컨벤션
`feat`: 메서드 기능 구현

`fix` : 오류 개선

`refactor`: 코드 리팩토링 (아래 명시한 두 가지 레벨 리팩토링 포함)

- Low Level Refactoring : 변수명, 함수명, 띄어쓰기 및 들여쓰기 등 가벼운 수정 작업
- High Level Refactoring : 구조 및 로직 수정 작업

`test` : 테스트 코드 추가 및 수정

## 📋 메서드 구현 리스트
  - [x] _.identity
  - [x] _.each
  - [x] _.indexOf
  - [x] _.slice
  - [x] _.map
  - [x] _.reduce
  - [x] _.includes
  - [x] _.flatten
  - [x] _.extend
  - [x] _.defaults
  <br>

## 📋 테스트 코드 구현 리스트
  - [x] _.identity
  - [x] _.each
  - [ ] _.indexOf
  - [x] _.slice
  - [ ] _.map
  - [ ] _.reduce
  - [ ] _.includes
  - [ ] _.flatten
  - [ ] _.extend
  - [ ] _.defaults

<br/>


## ❓질문 내용

### `_.each`
_lodash_ 페이지에 기재한 `_.each` 메서드 설명에 의하면,
"이터레이터 함수는 명시적으로 `false`를 반환하여 반복을 조기에 종료할 수 있습니다." 라고 되어 있습니다.
혹시 이 문장이 `undefined`를 반환하는 것과 연관이 있을까요?
[lodash 링크] https://lodash.com/docs/4.17.15#forEach

<br/>

### 📜 관련 참고 문서

- [Github 코드 라인 링크 걸기](https://docs.github.com/ko/get-started/writing-on-github/working-with-advanced-formatting/creating-a-permanent-link-to-a-code-snippet)
- [Github 마크다운 문법 설명서](https://docs.github.com/ko/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)

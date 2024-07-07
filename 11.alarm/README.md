> **REAL** - <ins>**Re**</ins>act + <ins>**Al**</ins>arm
React, Redux를 활용한 알람 애플리케이션입니다. 

<img width="500" alt="스크린샷 2024-07-04 오전 10 18 11" src="https://github.com/vanillacoding/vanillacoding-fe-test-whoisrey/assets/106927728/0726c770-f2d8-42d8-8de2-b0aa817f0292">

[배포링크](https://real-alarm.netlify.app/)
<br>

## ✔️ 기술규칙
- [x] Vite를 이용한 프로젝트 보일러 플레이트 구성
- [x] 글로벌 상태관리 라이브러리 Redux 활용
- [x] 패키지를 위한 모듈 관리 npm 사용
- [x] 글로벌 상태 구조 설계, 로컬 상태 설계
- [x] 함수형 컴포넌트 사용
- [ ] 테스트 코드 작성
- [ ] 최신 크롬 브라우저 지원
- [ ] Netlify 배포

<br>

## ✔️ 요구사항
- [x] 현재 날짜, 요일과 시간이 화면에 표시되어야 하며, 매 초 단위로 현재 시간이 바뀌어야 합니다.
- [x] 시계는 3가지 모드를 지원합니다. 각 모드에 맞게 동작
- [x] 알람은 일반 알람, 긴급 알람이 있습니다.
- [x] 알람을 추가할 수 있어야 합니다.
- [x] 알람 목록은 항상 알람시간 오름차순으로 보여야 합니다.
- [x] 개별 알람을 끄거나 삭제할 수 있습니다.
- [x] 현재 시간과 알람 시각이 동일한 경우, 알람 모드에 따라 알람이 울려야 합니다.
- [x] 소리, 진동은 화면 상에서 사용자가 인지할 수 있는 정도로 적절히 표시만 하면 됩니다.

## 상태 구조 설계
> 글로벌 상태로 우선 설계하되,
만약 글로벌 상태 관리 로직이 무거워지거나 컴포넌트 간 많은 전달을 거치지 않는 상태는 로컬 상태로 설계하였습니다. 
 
### 글로벌 상태 구조 설계
가장 먼저, 알람 애플리케이션의 핵심 기능인 알람과 시계의 핵심 기능들을 글로벌 상태로 설계하였습니다.
```jsx
  const alarmSlice = createSlice({
    name: "alarm",
    initialState,
    reducers: {
      setMode: (state, action) => {
        // ...
      },
      addAlarm: (state, action) => {
        // ...
      },
      removeAlarm: (state, action) => {
        // ...
      },
    },
  });
```

```jsx
  const clockSlice = createSlice({
    name: "clock",
    initialState,
    reducers: {
      updateTime: (state) => {
        // ...
      },
      setClockMode: (state, action) => {
        // ...
      },
    },
  });
```



### 로컬 상태 구조
UI에서 알람의 상태를 직접적으로 표시하거나 조건부 렌더링으로 모달을 제어하기 위해 로컬 상태로 관리하였습니다.
```jsx
  const [isActive, setIsActive] = useState(false);
  const [alarmMode, setAlarmMode] = useState(null);
  const [currentAlarm, setCurrentAlarm] = useState(null);
```

컴포넌트에서 사용자의 입력 값에 대해 유효성 검사를 진행하거나 전역 상태에 객체 형태로 전달하기 위해 로컬 상태로 관리하였습니다.
```jsx
  const [alarmDetail, setAlarmDetail] = useState({
    mode: "normal",
    date: "",
    time: "",
    message: "",
  });
```

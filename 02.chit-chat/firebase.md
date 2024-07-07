# Firebase 설정 방법

<br>
<br>

## 1. Firebase 프로젝트 만들기

1. [Firebase 콘솔](https://console.firebase.google.com)에서 **프로젝트 추가**를 클릭하세요.
2. 원하는 프로젝트 이름을 입력하세요. 예) Chit Chat
3. Firebase 프로젝트를 위한 Google 애널리틱스을 설정할지 결정하세요. 필수적으로 필요하진 않습니다.
4. **프로젝트 만들기**를 클릭하세요.
5. 프로젝트가 준비되면, **계속** 버튼을 클릭하세요.

<br>
<br>

## 2. 앱 등록하기

<br>
<br>

1. 콘솔의 프로젝트 메인 페이지 중앙에서, 웹 아이콘 버튼을 클릭하세요.

<img src="/readme-assets/1.png"  width="300">

<br>

2. 앱 등록 절차에서, 앱 닉네임을 입력하세요. 예) Chit Chat

<img src="/readme-assets/2.png"  width="300">

<br>

3. Firebase 호스팅을 설정하도록 체크박스를 클릭하세요.

<br>

4. **앱 등록** 버튼을 클릭하세요.

<br>

5. 화면에 표기된 `firebaseConfig` 객체를 복사하여, `/src/js/firebase.js`에 입력하세요.

<img src="/readme-assets/3.png"  width="500">

<br>

6. 다시 콘솔 메인 페이지로 이동하세요.

<br>
<br>

## 3. Firebase 실시간 데이터베이스 설정하기

<br>
<br>

1. Firebase 콘솔 메인 페이지 좌측 사이드 메뉴에서 **모든 제품**을 클릭하세요.

<img src="/readme-assets/4.png"  width="200">

<br>

2. **실시간 데이터베이스**(Realtime Database)를 클릭하세요.

<img src="/readme-assets/5.png"  width="400">

<br>

3. **데이터베이스 만들기**를 클릭하세요.

<img src="/readme-assets/6.png"  width="300">

<br>

4. 실시간 데이터베이스 위치를 한국과 가까운 곳으로 선택하세요.

<br>

5. 잠금 모드로 시작하고, **사용 설정** 버튼을 클릭하세요.

<br>

6. 규칙 메뉴로 접속하여, 모든 권한을 공개(`true`)로 설정하세요. (게시 후, 빨간 경고창이 나타날 수 있습니다.)

<img src="/readme-assets/7.png"  width="500">

<br>

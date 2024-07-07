# Firebase를 이용하여 배포하기

<br>
<br>

## Firebase Hosting 생성하기

<br>

Firebase 콘솔에서 Hosting을 선택하면 아래와 동일한 안내 절차가 설명되어 있습니다.

<br>
<br>

## Firebase CLI 설치하기

<br>

```sh
npm install -g firebase-tools
```

> 혹시라도 npm을 이용해 설치가 잘 안되시면, [Firebase cli 페이지](https://firebase.google.com/docs/cli)에서 직접 다운로드 받을 수도 있습니다.

<br>
<br>

## Firebase CLI를 이용하여 로그인하기

터미널에서 아래 명령어를 실행하세요.

<br>

```sh
firebase login
```

<br>
<br>

## Firebase 명령어 테스트 해보기

터미널에서 아래 명령어를 실행하세요.

<br>

```sh
firebase projects:list
```

<br>

> 프로젝트 목록이 나열된다면, 명령어가 잘 실행되는 것입니다.

<br>
<br>

## Firebase Init

터미널에서 과제의 루트(최상위) 디렉토리로 이동하여 아래 명령어를 실행하세요.

<br>

```sh
firebase init
```

<br>

1. 최초 옵션 선택에서 Realtime Database를 선택하고 진행하세요. (Space 키를 이용해 선택한 후, Enter 키를 이용하여 다음 단계로 진행합니다.)
2. **Use an existing project**를 선택하고, Firebase 콘솔에서 생성한 프로젝트를 선택하고 계속 진행합니다.
3. Enter 키를 이용해 계속 진행하고 완료합니다.

<br>
<br>

## `firebase.json` 수정하기

이전 단계가 성공했다면, 과제 루트 디렉토리에 `firebase.json` 파일이 생성되어 있어야 합니다. 아래의 내용과 동일하게 `firebase.json` 파일 내용을 수정하세요.

<br>

```json
{
  "database": {
    "rules": "database.rules.json"
  },
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"]
  }
}
```

<br>
<br>

## 빌드하기

과제 루트 디렉토리에서 아래 명령어를 실행하세요.

<br>

```sh
npm run build
```

<br>
<br>

## 배포하기

과제 루트 디렉토리에서 아래 명령어를 실행하세요.

<br>

```sh
firebase deploy
```

<br>
<br>

## 라이브 사이트 확인하기

[Firebase 콘솔](https://console.firebase.google.com)에서 본인 프로젝트 메인 페이지의 **Hosting 메뉴**에 접속하면, 내 프로젝트가 호스팅 된 라이브 사이트 주소를 찾을 수 있습니다. 배포가 잘 되었는지 확인합니다.

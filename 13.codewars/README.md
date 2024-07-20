> [Codewars](https://codewars.com)와 같이 등록되어 있는 알고리즘 문제를 풀 수 있는 어플리케이션입니다.

<div align="center">
  <img width="600" alt="스크린샷 2024-07-18 오후 5 04 25" src="https://github.com/user-attachments/assets/da08cf65-3a70-4ba1-ae20-2d03babc6ac1">
</div>

<br />

## 🗂️ Project Structure

- `controllers`: 프로젝트의 요청 로직을 처리하는 컨트롤러 함수
- `database`: MongoDB에 연결을 설정하는 파일
- `models`: 컨트롤러와 데이터베이스 사이에서 데이터의 유효성을 검사하는 모델 함수 (스키마 정의)
- `passport`: 패스포트 모듈과 관련된 로직을 처리하는 파일
- `public`: 정적인 CSS, JavaScript, 이미지 파일
- `routes`: HTTP 메서드를 사용한 앱 경로 지정 핸들러 파일
- `views`: 서버에서 렌더링할 수 있는 템플릿 파일 
- `app.js`: 해당 프로젝트 루트 파일

```
🗂️codewars
┣ 📁controllers
┃ ┣ pages.png
┃ ┣ problems.png
┃ ┗ users.js
┣ 📁database
┃ ┗ connection.js
┣ 📁models
┃ ┣ Problems.js
┃ ┗ User.js
┣ 📁passport
┃ ┣ auth.js
┃ ┣ config.js
┃ ┗ localStrategy.js
┣ 📁public
┃ ┣ 📂icons
┃ ┣ 📂javascripts
┃ ┃ ┣ handlers.js
┃ ┃ ┗ settings.js
┃ ┣ 📂logos
┃ ┗ 📂stylesheets
┃   ┣ buttons.css
┃   ┣ error.css
┃   ┣ index.css
┃   ┣ modal.css
┃   ┣ nav.css
┃   ┣ problems.css
┃   ┗ users.js
┣ 📁routes
┃ ┣ index.js
┃ ┣ join.js
┃ ┣ login.js
┃ ┣ logout.js
┃ ┗ problems.js
┣ 📁views
┃ ┣ error.ejs
┃ ┣ failure.ejs
┃ ┣ index.ejs
┃ ┣ join.ejs
┃ ┣ login.ejs
┃ ┣ message.ejs
┃ ┣ nav.ejs
┃ ┣ problem.ejs
┃ ┗ success.ejs
┣ app.js
┣ package.json
┗ package-lock.json
```

<br>

## ☑️ Check List

### 1. GET `/login`

<img src="https://github.com/user-attachments/assets/a5286119-e7b3-46e3-a526-db17592e767d" width="300px">

- [x] 로그인 버튼이 보여져야 합니다.
- [x] 로그인에 성공하면 `/` 페이지로 이동해야 합니다.
- [x] 로그인에 실패하면 `/login` 페이지로 다시 돌아와야 합니다.
- [x] 로그인 하지 않은 사용자는 로그인 페이지 이외의 그 어떤 페이지도 방문할 수 없어야 합니다.
- [x] Passport 모듈을 사용하여 소셜 로그인이나 일반 가입 및 로그인 중 한 가지를 선택하여 세션 기반의 로그인 기능을 구현하세요.

### 2. GET `/`\

<img src="https://github.com/user-attachments/assets/b9849eef-862a-4719-b495-03bcf94fcdb0" width="300px">

- [x] `/views/index.ejs` template을 보여주어야 합니다.
- [x] `/models/sample_problems.json`의 정보를 데이터베이스에 삽입하세요.
- [x] 데이터베이스에 넣어둔 문제 정보를 이용하여 문제 정보를 보여주도록 기존 템플릿을 수정해주세요. 문제 이름, 정답자 수, 문제 레벨의 정보가 보여야 합니다.
- [x] 리스트의 각 문제들을 눌렀을때, `/problems/:problem_id` 페이지로 이동하도록 해주세요.

### 3. GET `/problems/:problem_id`

<img src="https://github.com/user-attachments/assets/86dc4add-5596-47f1-b5f1-771caa0e6225" width="300px">

- [x] `problem_id`에 해당하는 문제의 상세 정보(문제 이름, 정답자 수, 문제 레벨, 그리고 문제에 대한 설명 등)을 화면에 보여주세요. UI 구성은 자유롭게 해주세요.
- [x] 문제에 대한 솔루션 코드를 입력할 수 있는 폼과 정답을 제출할 수 있는 버튼을 보여주세요.
- [x] 해당 폼을 작성하여 "제출" 버튼을 눌렀을때, `POST /problems/:problem_id`로 솔루션 정보를 보내세요. **AJAX나 `Fetch API` 등은 사용하지 마시고, HTML `form` 태그의 순수한 기능을 이용하세요.**

### 4. POST `/problems/:problem_id`
<div>
  <img src="https://github.com/user-attachments/assets/5baf337d-d3a5-4a3d-b705-5f533c75c4e3" width="300px">
  <img src="https://github.com/user-attachments/assets/ed7262fb-6948-42ff-9b24-cd5caf509f08" width="300px">
</div>

- [x] 클라이언트로부터 제출받은 코드 정보를 데이터베이스의 정답 코드를 이용하여 정답이 모두 일치하는지 판별하고 아래와 같은 형식으로 대응해주세요.
- [x] 제출된 코드가 테스트 케이스를 모두 통과했을 경우, `success.ejs` 템플릿을 생성하여 축하 메시지를 보여주세요. 그리고 다시 문제 리스트 화면으로 이동할 수 있는 링크도 보여주세요.
- [x] 제출된 코드가 테스트 케이스를 모두 통과하지 못했을 경우, `failure.ejs` 템플릿을 생성하여 결과를 보여주세요. 어떤 테스트 케이스가 통과하지 못하였는지에 대한 설명도 보여주세요.
- [x] 제출된 코드로 인한 실행 오류가 발생했을 경우, `failure.ejs` 템플릿을 보여주어야 하고 어떤 오류가 발생했는지 상세히 표기해주어야 합니다.
- [x] 사용자가 제출한 코드를 실행하는 방법에 대해서 깊이 고민해보시기 바랍니다.

### 5. Error & Invalid URL

<img src="https://github.com/user-attachments/assets/7990570d-7914-4433-8103-3014a93e3d9b" width="300px">

- [x] 오류 발생시, 발생한 문제에 대한 메시지와 함께 `error.ejs` 템플릿을 보여주세요.
- [x] 유효하지 않은 URL로 들어왔을 경우, 404 Not Found 메시지를 표기해주어야 합니다.
- [x] 서버 내부적인 문제가 발생했을 경우, 500 Internal Server Error 메시지를 표기해주어야 합니다. (보안 상의 이유로 사용자에게는 절대 내부 오류에 대한 상세 내용을 보여주어선 안됩니다.)

<br>

## 🙋🏻 Questions
### **mongoose** Scheme 정의
> mongoose에서 Scheme을 정의하는 목적은 데이터의 적합성 때문이라고 알고 있습니다.

과제를 진행하던 중, 비밀번호의 길이를 제한하는 유효성 검사 로직을 구현하지 못했습니다. 저희가 이해한 Scheme 정의는 유효성 조건에 부합한 로직을 프론트엔드(view, 유효성 검사 로직)에서 구현해야 의미있다고 생각했습니다. 혹시 프론트엔드 측에서 구현하지 못하더라도 Scheme을 정의하는 것도 의미가 있을까요?

예시는 아래와 같습니다.
```jsx
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: false,
  },
  password: {
    type: String,
    required: true,
    // minlength: 4,
    // maxlength: 8
  },
});
```
**Q) 프론트엔드에서 password의 길이 유효성 검사 기능을 구현하지 못한 상태에서 Scheme에서 위 주석과 같이 정의하는 코드가 의미가 있는지 궁금합니다.**


# Form Handling

이번에는 Node.js를 이용해 Form 처리를 해보도록 하겠습니다. 현재 서버는 아래와 같이 `/signup` 페이지로 들어갔을 경우 template을 보여주고 있습니다.

```js
if (req.method === "GET" && req.url === "/signup") {
  const template = await readFile(path.join(__dirname, "/static/signup.html"));

  res.end(template);
}
```

## 회원가입 처리하기

아래와 같이 사용자가 작성한 회원가입 양식을 처리해보도록 하겠습니다.

- 회원가입 양식 작성 및 제출
- 서버에 `users.txt` 파일 생성 및 사용자이름 기록

> 실제로 위와 같은 방식으로 회원가입을 처리하는 것은 좋지 않습니다. 현재 우리가 소화할 수 있는 범위 내에서 연습의 목적으로 하는 것일 뿐이니 참고해주세요.

현재 우리 서버에는 회원가입 양식을 보여주는 기능은 있지만, 회원가입 정보를 제출받아서 처리하는 로직이 없습니다. 회원가입 양식을 보여주는 것과 제출을 받아 처리하는 것은 엄연히 다른 업무입니다. 그래서 우리는 회원가입 양식을 제출받아 처리하는 Endpoint를 새로 만들어보도록 하겠습니다.

> Endpoint란, 서버가 처리할 수 있는 개별 요청을 의미합니다. 예를 들면, GET 요청을 처리하는 `/signup` URL이 하나의 endpoint가 될 수 있습니다. 또한 POST 요청을 처리하는 `/signup` URL이 또 다른 endpoint가 될 수 있습니다. 서버 입장에서는 메소드와 URL이 모두 일치해야 하나의 endpoint이기 때문에, GET `/signup`과 POST `/signup`은 각각 별개의 endpoint입니다.

회원가입이란 정보를 새롭게 생성하는 기능이기 때문에, 요청 URL은 `/signup`으로 하고 요청 메소드는 POST로 처리하도록 하겠습니다.

> 서버 개발자가 endpoint를 결정할때 가장 중요한 것은 요청 메소드와 요청 URL입니다. 요청 메소드는 HTTP 규격에 맞아야 하며, 요청 URL은 RESTful해야 합니다.

requestHandler 함수 내에 아래와 같이 조건을 주어 우리가 새롭게 만드는 endpoint를 작성할 준비가 되었습니다.

```js
if (req.method === "POST" && req.url === "/signup") {
  // 제출받은 회원가입 처리..
}
```

이제 우리가 만드는 endpoint 명세에 맞게 html 내의 form을 수정해야 합니다.

```html
<form action="/signup" method="POST">
  <input type="text" name="username" />
  <button type="submit">Submit</button>
</form>
```

위처럼 `<form>` 태그에 action과 method를 명시해주게 되면, 해당 form은 제출되었을때 우리가 명시한 action의 URL로 우리가 명시한 요청 메소드에 해당하는 요청을 보내게 됩니다. 그래서 현재 위 form이 제출되게 된다면, 우리 서버의 `/signup` URL로 POST 요청이 나가게 됩니다.

## TODO

서버에서는 이제 위의 form이 제출되었을때 사용자 이름을 받아야 합니다. Spec 2에 대한 테스트(`/spec/02-form-handling.js`)를 참고하여 아래와 같이 POST `/signup` 요청을 직접 구현해보세요.

- [ ] `users.txt` 파일에 사용자이름 기록 (구체적인 내용의 양식은 개의치 않으셔도 괜찮습니다.)
- [ ] 성공적일 경우, 201 응답코드로 응답
- [ ] 오류가 발생할 경우, 500 응답코드로 응답

> 다시 한번 말씀드리지만, 실제로 위와 같은 방식으로 회원가입을 처리하는 것은 좋지 않습니다. 현재 우리가 소화할 수 있는 범위 내에서 연습의 목적으로 하는 것일 뿐이니 참고해주세요.

### Check!

작업이 완료된 후, 아래 명령어를 이용해 `http://localhost:8000/signup`에서 회원가입 처리가 성공적으로 이루어지는지 확인해보세요.

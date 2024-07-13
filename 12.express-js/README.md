> Backend Development with Node.js and Express.js

<img src="https://github.com/vanillacoding/fullstack-bootcamp17-w14/assets/106927728/3871addc-045b-4633-812c-f533fb3209e6" > 

## ☑️ Check List

### [spec 1] node-basics

- [x] **GET `/`** should respond with html template in static directory
- [x] **GET to every other urls** should respond with `Hello World` text

### [spec 2] form handling

- [x] **GET `/signup`** should respond with signup template in static directory
- [x] **POST `/signup`** should success when an username is given

### [spec 3] express-basics

- [x] **GET `/`** should respond with template
- [x] **GET static assets** should be able to get static css file
- [x] **GET static assets** should be able to get static js file

### [spec 4] express-routing 

- [x] **POST `/`** should respond with success template
- [x] **GET `/google`** should redirect to google
- [x] **GET `/not-valid-url`** should respond with error template

### [spec 5] handling-json

- [x] **GET `/users`** should respond with users list json
- [x] **POST `/users`** should add new user
- [x] **PUT `/users/:user_id`** should update existing user
- [x] **PUT `/users/:user_id`** should respond with 400 for non-existing user
- [x] **DELETE `/user/:user_id`** should delete user
- [x] **DELETE `/user/:user_id`** should respond with 400 for non-existing user

### [spec 6] jwt-token

- [x] **GET `/user/:user_id/token`** should not generate token to invalid user
- [x] **GET `/user/:user_id/token`** should generate token to valid user
- [x] **GET `/user/:user_id/secret`** should not allow invalid token
- [x] **GET `/user/:user_id/secret`** should allow valid client id

### [spec 7] database

- [x] **GET `/articles`** should get all articles from the database and return in response
- [x] **POST `/articles/new`** should add a new article into the database
- [x] **POST `/articles/new`** should NOT add a new article with invalid token
- [x] **POST `/articles/new`** should NOT add a new article with invalid token
- [x] **PUT `/articles/:article_id`** should update existing article
- [x] **PUT `/articles/:article_id`** should respond with error if invalid id is given
- [x] **PUT `/articles/:article_id`** should NOT update article with invalid token
- [x] **PUT `/articles/:article_id`** should NOT update article without token
- [x] **DELETE `/articles/:article_id`** should delete existing article
- [x] **DELETE `/articles/:article_id`** should respond with error if invalid id is given
- [x] **DELETE `/articles/:article_id`** should NOT delete article with invalid token
- [x] **DELETE `/articles/:article_id`** should NOT delete article without token

<br>

## 📌 Commit Convention
| Tag | Description |
|---------|-----|
| Feat | Introduce new features |
| Refactor | Refactor code |
| Design | Add or update the UI and Style files |
| Add | Add, update or pass tests |
| Remove | Remove code or files |
| Comment | Add or update comments in source code |

## 🙋🏻 Questions
### 1. **mongoose**`connect` 메서드 - 코드 위치
> mongoose 라이브러리와 mongoDB 서버를 연결하기 위해 connect 메서드를 사용했습니다.

**Article.js**
```jsx
  const mongoose = require("mongoose");

  const YOUR_DATABASE_URI = process.env.MONGODATABASE_URI;

  mongoose.connect(YOUR_DATABASE_URI);

  const articleSchema = new mongoose.Schema({
    // ...
  });
  ```
과제에서는 Mongo DB의 데이터를 받아오는 로직이 Article.js 파일과 모두 연결되어 있기 때문에 해당 파일에서 메서드를 사용했습니다.
MVC 패턴과 연결지어 생각해봤을 때에도 데이터베이스와 연결하는 로직은 데이터를 받아오는 역할과 관련된 파일에 위치해야 한다는 원칙을 생각하고 작성했습니다. 또한 mongoose.js 파일을 생성하여 데이터베이스를 받아오는 로직만 모듈화하는 방법도 생각했는데 과제의 규모에 새로운 파일을 생성한다는 것은 조금 과하다는 생각을 하게 되었습니다. 

혹시 Article.js 파일에 해당 메서드를 사용한 방법이 확장성을 위해 프로젝트의 최상단인 app.js에 선언을 하는 것과 mongoose.js 파일을 생성하는 것보다 <ins>확실히 나은 방법일지 저희가 설명드린 근거가 합리적인 지</ins> 궁금합니다.

### 2. 에러핸들링
> mongoose에서 발생하는 에러 타입의 종류가 다음과 같이 있다고 조사하였습니다.

- Error.CastError
- Error.DivergentArrayError
- Error.DocumentNotFoundError
- Error.MissingSchemaError
- Error.MongooseServerSelectionError
- Error.OverwriteModelError
- Error.ParallelSaveError
- Error.StrictModeError
- Error.StrictPopulateError
- Error.ValidationError
- Error.ValidatorError
- Error.VersionError

 mongoose의 `findByIdAndUpdate`메서드를 사용하면서 유효한 아이디가 아닐때의 에러처리를 다음과 같이 하였습니다.

**article.controller.js**
```jsx
exports.update = async (req, res, next) => {
  try {
    const articleId = req.params.article_id;
    const updatedArticle = await Article.findByIdAndUpdate(articleId, req.body);

    res.status(200).json({ article: updatedArticle, result: "ok" });
  } catch {
    const error = {
      status: 400,
      message: "invalid article id",
    };

    next(error);
  }
};
```
테스트코드를 통과하기 위해 error라는 객체에 404 상태 코드와 메시지를 담아 `next(error)` 로 에러처리 미들웨어로 넘겨주어 처리했는데 <ins>테스트 코드 이외에 발생한 에러는 어떻게 처리해야 하는지 궁금합니다,</ins>
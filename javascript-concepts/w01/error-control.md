# 📍 에러 핸들링
> 자바스크립트 코드에서 에러 처리를 구현하는 방법은 크게 두 가지가 있습니다.
- if문, 단축 평가, 옵셔널 체이닝: 예외 적인 상황을 해당 연산자를 통해 확인해서 처리하는 방법
- `try...catch...finally`: 에러 처리 코드를 **미리 등록**하고 에러가 발생하면 에러 처리 코드로 점프하는 방법


## 📌 `try...catch...finally`
- 구조
  ```jsx
  try {
    // 코드...
  } catch(err) {
    // 에러 핸들링
  } finally {
    // 코드
  }
  ```
  1. `try{...}` 코드가 실행
    -  에러가 없다면 `try` 문의 값이 실행되고 `catch` 블록은 건너뛴다.
    -  에러가 있다면 `try` 코드 실행이 중단되고 `catch(err)` 블록으로 제어 흐름이 넘어간다.
  2. `finally{...}` 코드가 실행 (에러가 발생하더라도)
  - finally에 제어 구문이 있다면 `finally`문의 값을 반환
  - finally에 제어 구문이 없다면 `try`문 / (에러가 있다면) `catch`문의 값을 먼저 반환하고 이 후에 `finally` 문의 값을 반환한다.
- 예시:
    ```jsx
    try{
      console.log('try문 실행');
      error === error;
    } catch(e){
      console.log('error문 실행');
    } finally{
      console.log('finally문 실행');
    }

    // try문 실행
    // error문 실행
    // finally문 실행
    ```
    1️⃣ `try`문<br>
    `console.log('try문 실행)` 출력<br>
    `error === error` : 에러가 있기 때문에 `catch` 블록으로 이동<br>

    2️⃣ `catch`문<br>
    `console.log('error문 실행)` 출력<br>

    3️⃣ `finally`문<br>
    `console.log('finally문 실행')` 출력


## 📌 `throw`
`try` 문에서 문법적으로 틀리지 않지만 특이한 경우를 catch문으로 이동하기 위해 에러를 발생
- 구조
  ```jsx
  try {
    // 코드...
    throw new Error('catch 문으로 이동')
  } catch(err) {
    // 에러 핸들링
    console.log(err)
  } finally {
    // 코드
  }

  // Error: 'catch 문으로 이동'
  ```
  👉🏼 `try` 문에서 Error 객체를 생성하여 catch 문의 에러 변수에 던진다.

## 📌 `Error` 객체
`throw`문 에서에러를 발생할 때 생성자 함수를 사용하여 에러를 객체로 생성하고 에러에 대한 정보를 제공할 수 있다.

생성자함수| 인스턴스 |
----|--------|
`Error` | 일반적 에러 |
`SyntaxError` | 문법에 맞지 않는 문을 해석할 때 |
`ReferenceError`| 참조할 수 없는 식별자를 참조했을 때 |
`TypeError`| 피연산자 또는 인수의 데이터 타입이 유효하지 않을 때 |
`RangeError`| 숫자값의 허용 범위를 벗어났을 때 |
`URIError`| encodeURI 또는 decodeURI 함수에 부적절한 인수를 전달했을 때 |
`EvalError`| eval 함수에서 발생하는 에러 |

# 📍 반복문
> `for`, `for...of`, `for...in`, `while` 와 같이 조건식을 평가하여 해당 코드 블록을 반복해서 실행하는 문을 이야기합니다.

## 📌 종류
### 1️⃣ for
- 구조
  ```jsx
    for(initialization; condition; final-expression){
      statement;
    }
  ```
- 동작 원리
  - initialization: 실행하는 최초 변수 값을 지정한다.
  - condition: 조건문이 <span style="color: #4B45D6;">truthy</span>인 경우, 계속 실행한다.
  - final-expression: 반복문이 반복을 멈출 때까지 증가할지 검사할지 결정합니다.

### 2️⃣ for...of vs for...in

- `for...of`
  - 구조
    ```jsx
      for(variable of iterable){
        statement
      }
    ```
    👉🏼 <span style="font-weight: bold">이터러블(_iterable_)</span>한 객체를 대상으로 각 개별 속성<span style="font-weight: bold">값(_value_)</span>을 순회합니다.

- `for...in`
  - 구조
    ```jsx
      for(variable in obj){
        statement
      }
    ```
    👉🏼 <span style="color: teal">객체</span>를 대상으로 각 개별의 <span style="color: teal">프로퍼티</span>를 순회합니다.


## 📌 이터러블 객체란 무엇일까요?
이터러블 객체는...
1. Array
2. String
3. TypedArray
4. Map
5. Set
6. NodeList
7. arguments 객체

      .<br>
      .<br>
      .<br>

위에 해당하는 데이터 형태를 제외한 유사 배열 객체은 배열의 성격을 띄기 때문에 이터러블 객체인가요?

>🔎 **유사 배열 객체**<br>
>순서(_index_)와 길이(_length_)가 있는 배열의 형태를 띈 객체

이터러블 객체가 대상인 `for...of` 구문을 사용해서 확인해보겠습니다.

- 직접 만든 유사배열객체
  ```jsx
  const arrayLike = {
      0: "Study",
      1: "Hard",
      length: 2
  }

  for(let str of arrayLike) {} // Error arrayLike is not iterable
  ```
  👉🏼 순서와 길이가 있지만 직접 만든 유사배열객체는 `for...of` 문을 통해 순회할 수 없었습니다.

- HTML 태그에서 사용하는 노드들의 집합 컬렉션
  ```html
    <ul>
      <li>바</li>
      <li>닐</li>
      <li>라</li>
      <li>코</li>
      <li>딩</li>
    </ul>
    <script>
      const lists = document.querySelectorAll('li')
      console.log(lists) // NodeList(4) {0: li.text, 1: li.text, 2: li.text, 3: li.text, 4: li.text}

      for(let str of lists){
        console.log(str.innerText) // '바' '닐' '라' '코' '딩'
      }
    </script>
  ```
  👉🏼 앞선 예시로 유사배열객체는 모두 이터러블 객체가 아닌 줄 알았지만 위 사례를 보고 우리는 더욱 혼란에 빠졌습니다. 🤔

## 📌 유사배열객체는 이터러블 객체인가요! 아닌가요!
MDN, 모던 자바스크립트, 딥다이브 기타 모든 자료들을 살펴본 결과, <br>
이터러블 객체임을 판단하기 위해서는 `Symbol.iterator`를 반드시 구현하고 있어야 한다고 결론을 지을 수 있었습니다.<br>
### 즉, 유사배열객체에 `Symbol.iterator`이 구현되어 있다면 iterable 객체이고 아니면 iterable 객체가 아니였습니다.

## 📌 유사배열 객체를 이터러블 객체처럼 사용하고 싶다면?
### `Array.from()`<br>
  ES6에 도입된 문법으로 유사 배열 객체에서 얕게 복사된 새로운 `Array`(_iterable_) 인스턴스를 생성
  ```jsx
    const arrayLike = {
      0: "Study",
      1: "Hard",
      length: 2
    }

    Array.from(arrayLike) // ["Study", "Hard"]
  ```


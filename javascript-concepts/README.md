# 목표
> 자바스크립트 개념을 빠르고 심도 있게 가져가자

## 🔄 애자일 방법론 (Agile)
기존의 소프트웨어 개발 모델인 폭포수 모델과 비교되는 개발 방식으로 사이클을 <br>

**작고, 빠르게, 여러 번** 가져가면서 소프트웨어 개발하는 방식입니다.

<br>

<div style="display: flex">
<img src="./assets/폭포수.png">
<img src="./assets/agile.png" width="500px">
</div>

## 1️⃣ 작고
챕터별로 가져가기보다 개념을 작게 나눠 개념을 같이 살펴봤습니다.<br>

👉🏼  길어질 수 있는 혼자만의 공부 시간을 최소화하여 루즈해지는 것을 예방 ⏰

## 2️⃣ 빠르게
개념을 꼼꼼하게 살펴보되 둘 중 한명이라도 이해가 어려운 개념은 <h3 style="display: inline">10분</h3> 을 넘기지 않고 다시 사이클을 반복할 때 살펴보거나 멘토분들의 도움을 얻었습니다.<br>

👉🏼 개념을 보다가 우주로 가는 것을 방지 🚀

## 3️⃣ 여러 번
사이클을 반복하면서 이해가 어려웠던 부분은 다시 살펴볼 수 있었습니다.<br>
👉🏼 여러 번 반복하면서 이해의 깊이가 깊어짐 🔁

## 🧐 결론
소프트웨어 개발 방식을 접목하여 개념 공부를 하는 것이 낯설었지만 함께하는 페어가 서로에게 많은 것을 배울 수 있는 시간이었습니다.

<details>
<summary> <strong>📍 변수</strong> </summary>

<br>

# 📍 변수
> <p>예측할 수 없는 것에 접근하기 위해서 사용하는 방법</p>

## 📌 `var` vs `let` vs `const`
변수| 스코프 | 재할당 | 재선언
----|--------|--------|---------
`var` | 함수와 전역   |   O    |   O
`let` | 지역   |   O    |   X
`const`|지역   |   X    |   X

<br>
    <details>
    <summary><h3 style="display: inline">스코프 (Scope)</h3>: 값과 표현식이 실행될 수 있는 범위</summary>

   ```jsx
    function a(){
      if(true){
        var x = 1;
      }
      console.log(x); // 1
    }

    console.log(x); // Error
   ```
   👉🏼 `var` 키워드는 함수(스코프) 내부에서 선언한 변수는 함수 블록 안에서 어디서나 접근이 가능 
   ```jsx
    function a(){
      if(true){
        let x = 1;
      }

      console.log(x); // Error
    }
   ```
  👉🏼 `let` 키워드는 선언된 스코프 내부에서<span style="color: #D03C45">만</span> 접근이 가능
  </details>

  <br>
  
  <details>
  <summary><h3 style="display: inline">재할당</h3></summary>

  ```jsx
    let a = 12;
    console.log(a);  // 12

    a = 14;
    console.log(a);  // 14
  ```
  👉🏼 `let` 키워드는 선언한 변수의 값을 다시 할당하는 것이 가능
  ```jsx
    const b = 14;
    b = 15; // Error
  ```
  👉🏼 `const` 키워드는 상수를 변수로 선언하기 때문에 재할당이 불가능 ❌
  </details>

  <br>

  <details>

  <summary><h3 style="display: inline">재선언</h3></summary>

  ```jsx
    let a = 12;
    console.log(a);  // 12

    let a = 14; // Error
  ```
  👉🏼 `let` 키워드는 재할당은 가능하지만 선언된 변수를 다시 선언하는 것은 불가능 ❌
  ```jsx
    var a = 12;
    console.log(a); // 12

    var a = 14;
    console.log(a); // 14
  ```
  👉🏼 `var` 키워드는 언제나 재할당이 가능
  </details>

## 📌 선언 vs 할당 (+초기화)

- <span style="color: #D03C45">선언</span>: 변할 수 있는 데이터를 만드는 과정 `var`
- <span style="color: #D03C45">할당</span>: 변할 수 있는 데이터를 만들고 값을 넣어주는 과정 `=`
- (+ <span style="color: pink">초기화</span>): 변할 수 있는 데이터를 넣을 공간을 만드는 과정 (처음 할당했을 때 발생)
  ```jsx
  var a;
  console.log(a); // undefined
  ```

  ```jsx
  let a;
  console.log(a); // undefined
  ```
  ```jsx
  const a;
  console.log(a) // Error

  const b = 'wow';
  console.log(b) // wow
  ```
  👉🏼 `var`와 `let`와 다르게 `const`는 자동으로 초기화해주지 않기 때문에 선언과 할당이 <span style="color: #D03C45">동시에</span> 이루어져야 초기화 작업 이루어진다.

## 📌 호이스팅(Hoisting)과 TDZ(Temporal Dead Zone)
<div style="display: flex; justify-content: space-evenly">
  <img src="../fullstack-bootcamp17-w01/w01/img/var.jpeg" width="280px">
  <img src="../fullstack-bootcamp17-w01/w01/img/let.jpeg" width="275px">
</div>

- <span style="color: #D03C45">호이스팅</span>: 다양한 선언문을 해당 범위의 최상단으로 올려지는 것처럼 보이는 현상
  ```jsx
  console.log(b); // undefined

  var b = 12;
  ```

- <span style="color: #D03C45">TDZ</span>(_Temporal Dead Zone_): 스코프 선언문 시작 지점부터 변수가 초기화되는 시점 사이에 변수를 참조할 수 없는 구간
  ```jsx
  // TDZ
  console.log(a); // Error
 
  let a = 12;
  ```
  👉🏼 `let` 키워드로 선언한 변수는 선언 단계와 초기화 단계가 분리되어 TDZ가 발생

## 🤔 왜 `var`키워드를 사용하는 것을 지양해야 할까요?
직접 코드를 작성하며 살펴보았습니다.. 👨🏻‍💻
```jsx
  var place = "vaco";

  if(){
    ....
  } else{
    ...
  }

  for(let i = 0; i < 10; i++){
    ...
  }

  var place = "home";

  function study(place){
    return `I wanna study in ${place}`;
  }

  study(place)
```
☠️ 재할당이 가능한 `var` 키워드는 복잡한 로직 속에서 실수로 같은 이름으로 변수를 재할당하게 되면 의도하고자 하는 결과값과 다르게 반환할 위험이 있다. ☠️

</details>

<details>
<summary> <strong>📍 반복문</strong> </summary>

<br>

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

</details>




<details>
<summary> <strong>📍 조건문</strong> </summary>
<br>


# 📍 조건문
## 📌 조건문의 종류
### 1️⃣ `if... else...`
- 구조
  ```jsx
    if(condition){
      statement1;
    } else {
      statement2;
    }
  ```
- 동작원리
  * condition : **truthy** 나 **falsy** 로 평가되는 표현식이 들어옵니다
  * statement1 : condition 이 **truthy** 로 평가 될 경우 실행되는 구문
  * statement2 : condition 이 **falsy** 로 평가 될 경우 실행되는 구문


### 2️⃣ 삼항연산자(_Ternary operator_)
  - 구조
      ```jsx
      condition ? statement1 : statement2;
      ```
  - 동작원리
    * condition : **truthy** 나 **falsy** 로 평가되는 표현식이 들어옵니다
    * statement1 : condition 이 **truthy** 로 평가 될 경우 실행되는 구문
    * statement2 : condition 이 **falsy** 로 평가 될 경우 실행되는 구문

### 3️⃣ switch
  - 구조
    ```jsx
      switch(expression){
        case choice1:
          statement1;
          break;
        case choice2:
          statement2;
          break;
        default:
          statement3;
      }
    ```
  - 동작원리
    - expression: 구문이 실행되도록 기준이 되는 표현식 또는 **값**
    - statement1: 표현식의 값과 choice1이 일치할 때 실행되는 구문
    - statement2: 표현식의 값과 choice2이 일치할 때 실행되는 구문
    - default: 표현식이 case에 해당하는 값이 없을 경우 default에 있는 statement3가 실행됩니다.

  - __Fall Through__

    `break` 문이 없을 때, `switch` 문을 탈출하지 않고 구문이 끝날 때까지 모든 `case` 문과 `default` 문을 실행하는 과정입니다.

      ```jsx
        const month = 4;
        let days = 0;

        switch(month){
          case 1: case 3: case 5: case 7: case 8: case 10: case 12:
            days = 31;
            break;
           case 4: case 6: case 9: case 11:
            days = 30;
            break;
          case 2:
            days = 29;
            break;
          default:
            console.log('Invalid month');
        }

        console.log(days) // 30
      ```
      👉🏼 위 예시처럼 의도적으로 사용할 수도 있지만
      ```jsx
      let answer = 2;

      switch(answer){
        case 1:
          console.log('오답');
        case 2:
          console.log('정답');
        case 3:
          console.log('오답');
        default:
          console.log('미표기');
      }

      // 정답, 오답, 미표기
      ```
      👉🏼 의도하지 않은 fall through는 원하지 않는 결과값을 도출할 수 있습니다.

## 🤔 언제 어떤 조건문을 쓰는 것이 좋을까요?
   > **1)** 조건으로 값으로 결정해야 하는 경우,<br>
   `if...else`와 `삼항연산자`를 비교할 수 있는데 표현식에 해당하는 **삼항연산자**가 값을 할당할 수 있기 때문에 더욱 좋습니다. 

  ```jsx
    function whoAreU(person){
      if(person.age <= 18){
        return '미성년자';
      } else if(person.age > 60){
        return '노인';
      } else {
        return '청년';
      }
    }

    const ken = {
      job: 'captain',
      age: 19
    }

    whoAreU(ken) // 청년
  ```
  👉🏼 미성년자, 청년, 노인인지 판별하는 조건식은 3개의 `if...else` 문을 사용한 위 코드를

  ```jsx
    function whoAreU(person){
      const personAge = person.age <= 18 ? '미성년자' : person.age > 60 ? '노인' : '청년';
      console.log(personAge)  // 인수로 받은 객체의 age로 판단한 '미성년자', '청년', '노인' 값 중 하나
    }

    const ken = {
      job: 'captain',
      age: 19
    }

    whoAreU(ken); // 청년
  ```
  👉🏼 하나의 `삼항연산자` 표현식으로 구현할 수 있고 표현식의 값을 변수에 **할당**할 수도 있다.


  > **2)** 만약 평가하는 대상이 불리언 값이 아닌 **명확한 값**으로 **다양하게** 평가하는 경우,<br> 
  다른 조건문보다 `switch`문을 사용하는 것이 더욱 좋습니다.

  ```jsx
    let inEnglish = ""

    function translate(weather){
      switch(weather){
        case '봄':
          inEnglish = 'spring';
          break;
        case '여름':
          inEnglish = 'spring';
          break;
        case '가을':
          inEnglish = 'spring';
          break;
        case '겨울':
          inEnglish = 'spring';
          break;
        default:
          inEnglish = '';
      }
      return inEnglish;
    }

    translate('봄'); // 'spring'
  ```
<details>
<summary>if...else... 예시</summary>

  ```jsx
    let inEnglish = ""

    function translate(weather){
      if(weather === '봄'){
        inEnglish = 'spring';
      } else if(weather === '여름'){
        inEnglish = 'summer';
      } else if(weather === '가을'){
        inEnglish = 'autumn';
      } else if(weather === '겨울'){
        inEnglish = 'winter';
      } else {
        inEnglish = "";
      }
      return inEnglish;
    }

    translate('봄');
  ```
  </details>

  👉🏼 `if...else...` 문으로 구현하는 것보다는 case를 직관적으로 살펴볼 수 있어서 더 좋다고 생각합니다. (~~그렇다고 해주세요 제발~~)

</details>

<details>
<summary> <strong>📍 함수</strong> </summary>

<br>

# 📍 함수 

## 📌 함수 선언식 vs 함수 표현식
### 1️⃣ 구조
- <span style="color: #4B45D6">함수 선언식</span>
  ```jsx
    function whereAmI(){
      return 'vaco';
    }

    whereAmI() // 'vaco'
  ```



- <span style="color: #D03C45">함수 표현식<span>
  ```jsx
  const whereAmI = function(){
    return 'vaco';
  }

  whereAmI() // 'vaco'
  ```

### 2️⃣ 동작원리
- <span style="color: #4B45D6">함수 선언식</span>

  <img src='../fullstack-bootcamp17-w01/w01/img/function.webp' width= 50%>

  👉🏼 함수 선언식은 선언 하자마자 선언 및 초기화와 할당이 **동시에** 이루어 진다.

- <span style="color: #D03C45">함수 표현식</span>

  <img src="../fullstack-bootcamp17-w01/w01/img/function할당.png" width= 50%>

  👉🏼 함수 표현식은 함수 변수에 할당 되는 것이므로 함수의 선언 및 초기화는 **변수**의 방식을 따릅니다.

## 📌 화살표 함수(_arrow function_)
ECMAScript 6에서 도입된 문법으로 `function` 키워드 대신에 화살표를 사용해서 조금 더 **간략해진** 방법입니다.
### 1️⃣ 구조
  ```jsx
  const whereAmI = () =>{
    return 'vaco';
  }
  ```
### 2️⃣ 과연 구조만 간략해졌을까요???
화살표 함수에서는 구조 뿐만 아니라 **내부 동작**도 간략화 되었습니다.

1. 화살표 함수는 인스턴스를 생성할 수 없는 non-constructor 다.

2. 중복된 매개변수 이름을 선언 할 수 없다.

3. 화살표 함수는 함수 자체에 `this`,`arguments`,`super`,`new.target` 바인딩을 갖지 않습니다.

### 3️⃣ 우리는 우주로 가지 않기 위해 우선 this 바인딩에 집중하기로 했습니다. 🚀
- 정의
  * `this` : 자신이 속한 <span style="font-weight: bold">객체</span>를 <span style="font-weight: bold">가리키는</span> 식별자 입니다.

  * `binding` : 식별자와 값을 연결하는 과정 입니다.

- 예시
    ```jsx
      let obj = {
        place: 'vaco',
        whereAmI(){
          return this.place; 
        }
      }

      obj.whereAmI() // 'vaco'
    ```
  👉🏼  `whereAmI()` 함수 안에 `this` 는 함수 자신이 속한 객체 (`obj`) 를 가리킵니다.

### 4️⃣ 그렇다면 `this` 는 무조건 자신이 속한 객체만을 가리키나요???
`this` 바인딩은 함수 호출 방식에 따라 `this` 가 가리키는 객체를 동적으로 결정 할 수 있습니다.
1. 일반함수 호출
    ```jsx
    function whereAmI(){
      console.log(`this is ${this}`); //'this is [object global]
    }
    ```
   👉🏼 일반 함수로 호출 할 경우 기본적으로 `this`는 window 인 전역객체를 가리킵니다.

2. 메서드 호출

    👉🏼 위 예시와 같이 그 메소드를 호출 한 객체`obj` 를 가리킵니다

3. 생성자 함수 호출
    ```jsx
    function Vaco(who){
      this.who = 'friends';
    }

    const suBo = new Vaco('subo')

    console.log(suBo.who) // 'friends'
    ```
    👉🏼 생성자 함수가 생성할 객체(`suBo`)(instance)를 가리킨다.

4. `apply()` `call()`
    ```jsx
    function whereAmI(a,b){
      this.place = a + b;
    }

    let obj = {
      place:'home'
    };

    console.log(obj); // { place:'home'}

    whereAmI.apply(obj,['va','co']);

    console.log(obj); // { place:'vaco'}

    whereAmI.call(obj,'ho','me');
    
    console.log(obj); // { place:'home'}
    ```
    👉🏼 `apply()` `call()`은 함수에서 this가 첫번째 인수인 객체를 가리키도록 동작합니다.


### 5️⃣ 그래서? (결론)
위에서 살펴본 this 바인딩이 화살표 함수는 없다는 의미는 결국... <h3 style="color: teal;"> 화살표 함수는 this를 동적으로 결정할 수 없다는 의미입니다. </h3>


</details>

<details>
<summary> <strong>📍 기타연산자</strong> </summary>

<br>

# 📍 기타 연산자
> 자바스크립트에서는 기존의 구문을 보다 효율적으로 작성하기 위해 새로운 문법들이 출시되었습니다.<br>


## 📌 Spread operator (`…`)
이터러블한 객체의 원소를 (잼 펴바르듯이) **나열**할 수 있는 ES6에서 새롭게 소개된 기능

<img src="../fullstack-bootcamp17-w01/w01/img/1000_F_161739690_0UcWlASmWSO96eZBHHOcdYszlsfrAjR0.jpg" width="400px">



### 1️⃣ 동작원리 
  이터러블한 객체를 다수의 인수 목록으로 **확장**합니다.
  - 사용 예시
  
      - 문자열
        ```jsx
          let str = "vaco";
          console.log([...str]); // ['v', 'a', 'c', 'o']
        ```
        👉🏼 하나의 문자열을 배열안에 요소들로 확장할 수 있습니다.

    - 최댓값 구하기

        ```jsx
          let arr = [12, 30 ,43, 20];
          console.log(Math.max(...arr)); // 43
        ```
        👉🏼 내장객체 `Math.max()` 메서드는 인수를 숫자 형태로 받습니다.

    - 배열 합치기
        ```jsx
          let arr = [1, 2, 3];
          let arr2 = [4, 5, 6];
          let merged = [...arr, ...arr2]; 
          console.log(merged); // [1, 2, 3, 4, 5, 6]
        ```
        👉🏼 배열의 요소들을 합칠 때 사용할 수 있습니다.



  ### 2️⃣ 똑같이 생긴 Rest Parameter !(`...`)
  <span style="color: grey">**Spread operator**는 이터러블한 객체를 다수의 인수 목록으로 **확장**합니다..</span><br>
  > 
  > 🔎 **Rest parameter**<br>
  >  여러가지 매개변수들을 하나의 **배열**로 **압축**합니다.

  ```jsx
    function makeArr(...str){
      return str;
    }

    makeArr('v', 'a', 'c', 'o'); // ['v', 'a', 'c', 'o']
  ```
  👉🏼 Spread operator는 **확장** Rest parameter는 **압축**이라는 키워드를 기억해주세요!


## 📌 Nullish **coalescing** operator (`??`)
여러 피연산자 중 그 값이 **할당**된 변수의 값을 찾을 수 있는 연산자

### 1️⃣ 동작 원리
왼쪽 표현식이 null 혹은 undefined인 경우, 오른쪽 표현식의 결과를 반환합니다. <br>
왼쪽 표현식이 null 혹은 undefined가 아닌 경우, 오른쪽 표현식은 **평가하지 않고** 왼쪽 표현식의 결과를 반환합니다.

  - 로딩 중인 데이터를 받아올 때 (데이터를 받아오는 시간이 3초)

    ```jsx
    let data;

    console.log(data); // undefined 

    // 로딩중
    console.log(data ?? '로딩중'); // '로딩중'
    ```
    👉🏼 `data`의 값을 불러올 때까지 '로딩중'을 문구로 사용자에게 알려줄 수 있습니다.

### 2️⃣ `??` vs `||` 둘 중 어떤 것을 사용하는 것이 좋을까요?
  
  1. `||`는 <br> 
  왼쪽 표현식이 <span style="color:#D03C45">falsy</span>인 경우, 오른쪽 표현식의 결과를 반환합니다.<br>
  왼쪽 표현식이 <span style="color:#4B45D6">truthy</span> 인 경우, 오른쪽 표현식은 **평가하지 않고** 왼쪽 표현식의 결과를 반환합니다. <br>

  2. `??` 는 <br>
  왼쪽 표현식이 null 혹은 undefined인 경우, 오른쪽 표현식의 결과를 반환합니다.<br>
  왼쪽 표현식이 null 혹은 undefined가 아닌 경우, 오른쪽 표현식은 **평가하지 않고** 왼쪽 표현식의 결과를 반환합니다.
  <br>
  - 관련 예시

    - `falsy` 값을 제공하고 싶을 때

      ```jsx
          let height = 0;
          console.log(height || 100); // 100
          console.log(height ?? 100); // 0
      ```
      👉🏼 위 예시같이 몸무게가 0(falsy)인 값도 반환하고 싶다면 `??` 연산자를 사용하는 것이 좋습니다.

    - `undefined` 혹은 `null` 값
      ```jsx
        function A(){
        	return undefined;
        }

        function B(){
    	    return false;
        }

        function C(){
    	    return "foo"
        }

        console.log(A() ?? C()); // "foo"
        console.log(B() ?? C()); // false
      ```
      👉🏼 `??` 연산자는 truthy, falsy가 중요한 것이 아니라  **값을 할당**했는지 여부가 더욱 중요합니다.



## 📌 Optional Chaining (`?.`)
프로퍼티가 없는 중첩 객체를 에러 없이 안전하게 접근할 수 있는 연산자

###  1️⃣ 동작 원리
  앞 쪽의 연산자의 값이 `undefined` 이나 `null` 이면 평가를 멈추고 `undefined`를 반환한다.

  ```jsx
      let user = {
	      name: 'lee',
	      age: 20
      };

      console.log(user.age); // 20
      console.log(user.dog); // Error
      console.log(user?.dog); // undefined
  ```
  👉🏼 `user`라는 객체에 없는 프로퍼티 dog을 옵셔널 체이닝 `?.`을 사용하여 Error가 아닌 `undefined`를 반환합니다.

### 2️⃣ 언제 사용하면 좋을까요?
  - 점심 메뉴 취합하기
    ```jsx
      let groupA = {
        number: 1,
        lunch: { menu: "hamburger" }
      }
      let groupB = {
        number: 2,
      }
      let groupC = {
        number: 3,
        lunch: { menu: "sushi" }
      }
      let groups = [groupA, groupB, groupC]

      // 1번 반복문
      for(let i of groups){
        console.log(i.lunch.menu) // typeError groupB의 lunch.menu가 없다.
      }

      // 2번 반복문
      for(let i of groups){
        console.log(i.lunch?.menu)
      }
    ```
    👉🏼 1번 반복문: 점심메뉴를 입력하지 않은 `groupB` 때문에 에러가 발생해서 `groupC`의 메뉴를 불러올 수 없다. <br>
    👉🏼 2번 반복문: 옵셔널체이닝을 활용하여 `lunch`에 `menu` 값을 입력하지 않은 `groupB`의 `menu`는 `undefined`로 반환하고 이어서 `groupC`의 메뉴를 불러올 수 있었다.


</details>

<details>
<summary> <strong>📍 에러 핸들링</strong> </summary>

<br>

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


</details>

# 📍 기타 연산자
> 자바스크립트에서는 기존의 구문을 보다 효율적으로 작성하기 위해 새로운 문법들이 출시되었습니다.<br>


## 📌 Spread operator (`…`)
이터러블한 객체의 원소를 (잼 펴바르듯이) **나열**할 수 있는 ES6에서 새롭게 소개된 기능

<img src="./1000_F_161739690_0UcWlASmWSO96eZBHHOcdYszlsfrAjR0.jpg" width="400px">



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

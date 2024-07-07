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
  <img src="../발표자료/img/var.jpeg" width="280px">
  <img src="../발표자료/img/let.jpeg" width="275px">
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

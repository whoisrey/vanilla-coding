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
  * condition : <span style="color: #4B45D6">truthy</span> 나 <span style="color: #D03C45">falsy</span> 로 평가되는 표현식이 들어옵니다
  * statement1 : condition 이 <span style="color: #4B45D6">truthy</span> 로 평가 될 경우 실행되는 구문
  * statement2 : condition 이 <span style="color: #D03C45">falsy</span> 로 평가 될 경우 실행되는 구문


### 2️⃣ 삼항연산자(_Ternary operator_)
  - 구조
      ```jsx
      condition ? statement1 : statement2;
      ```
  - 동작원리
    * condition : <span style="color: #4B45D6">truthy</span> 나 <span style="color: #D03C45 ">falsy</span> 로 평가되는 표현식이 들어옵니다
    * statement1 : condition 이 <span style="color: #4B45D6">truthy</span> 로 평가 될 경우 실행되는 구문
    * statement2 : condition 이 <span style="color: #D03C45">falsy</span> 로 평가 될 경우 실행되는 구문

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
    - expression: 구문이 실행되도록 기준이 되는 표현식 또는 <span style="color: teal; font-weight: bold">값</span>
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
   > **1)** 조건을 값으로 결정해야 하는 경우,<br>
   `if...else`와 `삼항연산자`를 비교할 수 있는데 표현식에 해당하는 <span style="color: green; font-weight: bold">삼항연산자</span>가 값을 할당할 수 있기 때문에 더욱 좋습니다. 

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
  👉🏼 하나의 `삼항연산자` 표현식으로 구현할 수 있고 표현식의 값을 변수에 <span style="color: #D03C45">할당</span>할 수도 있다.


  > **2)** 만약 평가하는 대상이 불리언 값이 아닌 <span style="color: green; font-weight: bold">명확한 값</span>으로 <span style="color: green; font-weight: bold">다양하게</span> 평가하는 경우,<br> 
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
<summary style="color: #D03C45">if...else... 예시</summary>

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

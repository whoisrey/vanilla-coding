> JavaScript로 객체 지향 프로그래밍과 함수형 프로그래밍의 개념들을 적용하여 기존 코드를 리팩토링하는 과제입니다.
<p align="center">
<img src="https://github.com/vanillacoding/fullstack-bootcamp17-w08/assets/106927728/54063a55-f2b6-4180-a646-1f4375973ea7" width="400">
</p>

<br>

## ✦ 커밋 컨벤션
`refactor`: 리팩토링  

`fix`: 커밋 합치기

<details><summary> <h4>Git Squash 진행</h4> </summary> 

**보조작업들과 관련된 커밋을 합치는 작업 진행**

1. `git rebase -i [commit number]` : 커밋을 묶을 시점을 선택

2. 빔 에디터를 통해 
- 대표 커밋을 **pick**
- 대표 커밋에 묶일 커밋들을 **squash**

    로 변경해준다.

3. `git push origin [branch] -f` : 하나로 묶은 커밋을 원격 저장소에 push
* 이미 이전에 커밋한 내용이 원격 저장소에 없으면 `-f`를 제거
 
4. 느낀점: 하나의 브랜치에서 작업한다면 연속된 커밋만 묶어줄 수 있기 때문에 동일한 작업을 연속적(+계획적)으로 진행해야겠다.
</details>

<br>

## ✔️ 과제 진행

### `src/01_OOP_SOLID` 
  - [x] `SRP` _single responsibility principle_
  - [x] `OCP` _open & closed principle_
  - [x] `LSP` _liskov subsititution principle_
  - [x] `ISP` _interface segregation principle_
  - [x] `DIP` _dependency inversion principle_
 
### `src/02_Functional`
  - [x] _pure function_
  - [x] _referential transparency_
  - [x] _composition_

### `src/03_Exercise`
  - [ ] **Employee**

<br>

<span id="top"></span>

## 📑 과제 상세

<span id="#SRP"></span>
### 단일 책임 원칙
_Single Responsibility Principle_

**1. 정의**

클래스는 단 하나의 책임만 가져야 한다.

**2. 문제 상황**

`ShoppingOrder` 클래스에서 <ins>10개 정도의 메서드(**책임**)</ins>를 처리하고 있다.
```jsx
class ShoppingOrder {
  searchOrderHistory() {
    // 주문 내역 검색
  }
  
  getOrder() {
    // 주문 정보 조회
  }

  placeOrder() {
    // 주문 생성
  }
  .
  .
  .
}
```

**3. 해결 방안**

기능을 책임이라 정의하고 기능적 책임에 따라 클래스를 분리한 뒤, 비슷한 기능을 수행하는 메서드들을 아래와 같이 각 클래스에 분류하였다.

- `Order History`: 주문 내역을 조회하는 기능
- `Order Management`: 주문을 관리(생성, 추가, 삭제)하는 기능 
- `Order Info`: 주문 정보를 제공하는 기능

<a href="https://github.com/vanillacoding/fullstack-bootcamp17-w08/blob/07192632b636bf17ce1f300373445152e23e4b77/src/01_OOP_SOLID/01_single_responsibility/shoppingOrder.js#L1-L25"> ⚑ 리팩토링 코드</a>

**4. 기대 효과**

각 클래스는 하나의 책임만 처리하기 때문에 다른 코드에서도 쉽게 사용할 수 있다. (**재사용성**)
클래스를 기능별로 분리했기 때문에 특정 기능 안에 로직을 수정할 때는 해당 클래스에만 접근(**캡슐화**)하여 수정할 수 있다. (**유지보수성**)

**5. 우려점**

책임에 따라 클래스를 분리하다보면 클래스 수가 증가함에 따라 코드가 길어질 수 있다. (**가독성**)

<br>

### 개방 폐쇄 원칙 OCP
_Open-Closed Principle_

**1. 정의**

확장에는 열려 있어야 하고 수정에는 닫혀 있어야 한다.

**2. 문제 상황**

새로운 유형의 몬스터에서 `attack()` 메서드를 사용해야 한다면 <ins>`Monster` 클래스 내부에서 수정</ins>해야 한다.
```jsx
class Monster {
  constructor(type) {
    this.type = type;
  }

  attack() {
    if (this.type === MONSTER_TYPES.DRAGON) {
      // Dragon attack
    } else if (this.type === MONSTER_TYPES.BEAST) {
      // Beast attack
    } else if (this.type === MONSTER_TYPES.GOBLIN) {
      // Goblin attack
    }
  }
}
```

**3. 해결 방안**

**a.** 새로운 유형의 `Monster` 자식 클래스를 생성하여 각 클래스에서 attack() 메서드를 재정의하도록 구현하였다. (**확장** 개방)
**b.** `Monster` 클래스 내부에서 유형에 맞게 `attack()` 메서드를 수정할 필요가 없도록 구현하였다. (**수정** 폐쇄)

<a href="https://github.com/vanillacoding/fullstack-bootcamp17-w08/blob/07192632b636bf17ce1f300373445152e23e4b77/src/01_OOP_SOLID/02_open_closed_principle/monster.js#L16-L44"> ⚑ 리팩토링 코드 (a)</a>
<a href="https://github.com/vanillacoding/fullstack-bootcamp17-w08/blob/07192632b636bf17ce1f300373445152e23e4b77/src/01_OOP_SOLID/02_open_closed_principle/monster.js#L8-L14"> ⚑ 리팩토링 코드 (b)</a>

**4. 기대 효과**

각 자식 클래스에서 `attack()` 메서드를 재정의(**다형성**)하면서 유형에 구애받지 않고 사용 가능하다. (**확장성**)
자식 클래스는 `Monster` 클래스에서 상속을 받기 때문에(**상속**) 코드의 중복을 줄이고 공통된 속성, 메서드는 어디서든 사용할 수 있다. (**가독성**)(**재사용성**)

**5. 우려점**

새로운 유형의 자식 클래스가 많아지게 되면 수많은 `attack()` 메서드를 개별적으로 관리해야 하는 어려움이 발생한다. (**유지보수성**)

<p align="left"><a href="#top">⬆ 과제 상세 </a></p>

<br>

### 리스코프 치환 원칙 LSP
_Liskov Substitution Principle_

**1. 정의**

자식 클래스는 부모 클래스로 치환할 수 있어야 한다.
➤ 자식 클래스는 부모 클래스와 동일한 방식으로 사용될 수 있어야 한다.
➤ 자식 클래스가 공통적으로 가져야 하는 속성과 메서드들은 부모 클래스에 모두 포함되어야 한다.

**2. 문제 상황**

**a.** `Meat`, `Smartphone` 자식 클래스에서 `getName()` 메서드는 <ins>부모 클래스와 동일하지 않은 방식</ins>으로 재정의되었다.
```jsx
class Product {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}

class Meat extends Product {
  getName() {
    return "Beef";
  }
}

class Smartphone extends Product {
  getName() {
    return "iPhone 15 Plus Max";
  }
}
```
**b.** `Product` 클래스의 상속으로 인해 `Smartphone` 클래스에서 사용하지 않는 `this.expiredAt`를 사용하는 <ins>필요없는 기능들이 구현</ins>되고 있다. 
(<a href="#ISP">ISP</a> 원칙 위반)
```jsx
class Product {
  constructor() {
    this.expiredAt = new Date();
  }

  getExpiredDate() {
    return this.expiredAt;
  }

  getProductInfo() {
    return {
      name: this.name,
      expiredAt: this.expiredAt,
    };
  }
}

class Smartphone extends Product {
}
```

**3. 해결 방안**

**a.** 자식 클래스에서 확장할 수 있도록 `Product` 부모 클래스에서 자식 클래스들이 공통적으로 사용하는 속성, 메서드들을 정의하였다. 
**b.** 필요한 메서드들만 추가할 수 있도록 부모 클래스와 자식 클래스 사이에 새로운 클래스 `Food`, `Device`를 만들어 비슷한 특성을 가진 개체들을 묶어줄 수 있는 추상화 작업을 진행하였다.

<a href="https://github.com/vanillacoding/fullstack-bootcamp17-w08/blob/07192632b636bf17ce1f300373445152e23e4b77/src/01_OOP_SOLID/03_liskov_substitution/product.js#L6-L13"> ⚑ 리팩토링 코드 (a) </a>
<a href="https://github.com/vanillacoding/fullstack-bootcamp17-w08/blob/07192632b636bf17ce1f300373445152e23e4b77/src/01_OOP_SOLID/03_liskov_substitution/product.js#L15-L44"> ⚑ 리팩토링 코드 (b) </a>


**4. 기대 효과**

`Product` 부모 클래스에서 공통된 속성과 메서드가 정의되어 있기 때문에(**상속**) 어디서든 사용이 가능하고 코드의 중복도 줄일 수 있다. (**재사용성**)(**가독성**)
`Food`, `Device` 클래스로 책임을 분리한 덕분에 (**응집도**) 코드를 이해하고 관리하는데 용이하다. (**가독성**)(**유지보수성**)


**5. 우려점**

상속 관계가 많아지면 코드가 복잡해질 위험이 있다. (**가독성**)


<p align="left"><a href="#top">⬆ 과제 상세 </a></p>

<br>

<span id="ISP"></span>
### 인터페이스 분리 원칙 ISP
_Interface Segregation Principle_

**1. 정의**

인터페이스(**클래스**)는 자신이 사용하지 않는 메서드에 의존하지 않도록 분리해야 한다.


**2. 문제 상황**

상속 관계 때문에 `MotorCycle`은 <ins>`openDoors()` 메서드를 사용하지 않지만</ins> 해당 메서드에 의존하고 있다. (상속받고 있다.)
```jsx
class Vehicle {
  openDoors() {
    // Open doors of the vehicle
  }
}

class MotorCycle extends Vehicle {
  prepareHelmet() {
    // Prepare helmet
  }

  wearHelmet() {
    // Wear helmet for my safety
  }
}
```

**3. 해결 방안**

**a.** 필요없는 메서드를 상속하지 않도록 `Vehicle` 부모 클래스에는 자식 클래스에서 공통적으로 사용하는 속성과 메서드만 정의하였다.
**b.** helmet과 door, 용품을 각각 하나의 책임으로 정의하고 관련 메서드들을 분류하여 새로운 클래스에 해당 메서드들을 정의하였다. (**_SRP_**)
**c.** `Vehicle` 부모 클래스에서 상속받는 자식 클래스들은 b에서 정의한 클래스로 필요한 메서드만 사용할 수 있도록 구현하였다.

<a href="https://github.com/vanillacoding/fullstack-bootcamp17-w08/blob/07192632b636bf17ce1f300373445152e23e4b77/src/01_OOP_SOLID/04_interface_segregation/vehicle.js#L1-L7"> ⚑ 리팩토링 코드 (a) </a>
<a href="https://github.com/vanillacoding/fullstack-bootcamp17-w08/blob/07192632b636bf17ce1f300373445152e23e4b77/src/01_OOP_SOLID/04_interface_segregation/vehicle.js#L9-L17"> ⚑ 리팩토링 코드 (b) </a>
<a href="https://github.com/vanillacoding/fullstack-bootcamp17-w08/blob/07192632b636bf17ce1f300373445152e23e4b77/src/01_OOP_SOLID/04_interface_segregation/vehicle.js#L19-L43"> ⚑ 리팩토링 코드 (c) </a>

**4. 기대 효과**

`HelmetOperations`, `DoorOperations` 클래스로 분리하면서 <a href="#SRP">SRP</a>를 준수하면서 발생하는 장점들이 있다. (**재사용성**)(**유지보수성**)
기능별로 분리한 두 인터페이스(클래스)로 새로운 유형의 클래스를 쉽게 생성할 수 있다. (**확장성**)


**5. 우려점**

인터페이스가 많아지면 코드가 복잡해질 위험이 있다. (**가독성**)

<p align="left"><a href="#top">⬆ 과제 상세 </a></p>

<br>


### 의존성 역전 원칙 DIP
_Dependency Inversion Principle_

**1. 정의**

부모 클래스는 자식 클래스에 의존해서는 안 되며 두 클래스 모두 추상화에 의존해야 한다.


**2. 문제 상황**

`OrderHandler` 클래스가 `PayPalPayment` 라는 추상 클래스가 아닌 <ins>구체적인</ins> 결제 처리 클래스에 의존하고 있다.
```jsx
class OrderHandler {
  processPayment(paymentDetails, amount) {
    const isPaymentSuccess = PayPalPayment.requestPayment(
      paymentDetails,
      amount
    );

    return isPaymentSuccess ? true : false;
  }

  refund(paymentId) {
    const isRefundSuccess = PayPalPayment.processRefund(paymentId);

    return isRefundSuccess ? true : false;
  }
}
```

**3. 해결 방안**

**a.** `OrderHandler`가 추상 클래스에 의존할 수 있도록 `PaymentMethod`를 생성하였다.
**b.** 구체적인 결제 방식은 추상 클래스 `PaymentMethod`로 부터 상속받도록 구현하였다.

<a href="https://github.com/vanillacoding/fullstack-bootcamp17-w08/blob/07192632b636bf17ce1f300373445152e23e4b77/src/01_OOP_SOLID/05_dependency_inversion/orderHandler.js#L1-L9"> ⚑ 리팩토링 코드 (a) </a>
<a href="https://github.com/vanillacoding/fullstack-bootcamp17-w08/blob/07192632b636bf17ce1f300373445152e23e4b77/src/01_OOP_SOLID/05_dependency_inversion/orderHandler.js#L11-L19"> ⚑ 리팩토링 코드 (b) </a>

**4. 기대 효과**

`OrderHandler` 클래스가 다양한(**다형성**) 결제 방식 클래스에 의존이 가능해진다. (**확장성**)
`PaymentMethod` 추상 클래스에 공통된 기능을 정의하면서 코드의 중복을 줄일 수 있다.  (**재사용성**)


**5. 우려점**

추상화 수준을 이해하는데 어려움이 발생할 수 있다. (**유지보수성**)

<p align="left"><a href="#top">⬆ 과제 상세 </a></p>

<br>

-----------------------------------------------------------------------------------------------------------------------

### 순수 함수 & 참조 투명성
_Pure Function
Referential Transparency_

**1. 정의**

**a.** 아래 두 가지 조건을 만족하는 함수를 **순수 함수**라고 정의한다.
  - 같은 입력값이 주어졌을 때, 언제나 같은 결과값을 **반환**한다.
  - 사이드 이펙트를 발생시키지 않는다. ➤ 외부에서 선언된 상태를 수정하지 않는다.
 
**b.** 표현식이 동일한 입력값에 대해 항상 동일한 결과값을 반환하는 것을 **참조 투명성**이라고 정의한다.

<img src="https://github.com/vanillacoding/fullstack-bootcamp17-w08/assets/106927728/da2c14b6-1ec3-4d19-81af-5ca4871bd08e" width="500px">
<a href="https://edward-huang.com/functional-programming/tech/programming/scala/2020/01/30/pure-function-vs-referential-transparency/">그림 출처</a>

➤ 즉, _**순수 함수는 참조 투명성을 항상 만족하지만 
참조 투명성을 갖고 있다고 하더라도 항상 순수 함수는 아니다.**_

**2. 문제 상황**

전역에 선언된 변수 `cartItems`와 `totalPrice`가 `addItem()`, `removeItem()`, `increaseItemQuantityInCart()`함수의 동작으로 인해 수정되고 있다. ➤ <ins>사이드 이펙트 발생</ins>

**3. 해결책**

**a.** 전역 변수`totalPrice`를 `calculateTotalPrice()`라는 함수로 대체하였다.
**b.** 각 함수에서 사용하는 입력값의 상태가 변하지 않도록 아래 도구들을 사용하였다.
- `reduce()`
- `filter()`
- `map()`
- `...` _spread operator_  
**+** 중첩 구조의 참조형 데이터를 복사하는 경우, 특정 요소만의 상태 변경을 막기 위해 콜백 함수 안에서 `...`를 사용)

**c.** 각 함수에서 결과값을 **반환**하도록 return 제어 구문을 모두 추가하였다.


<a href="https://github.com/vanillacoding/fullstack-bootcamp17-w08/blob/07192632b636bf17ce1f300373445152e23e4b77/src/02_Functional/01_pure/shoppingCart.js#L10-L12"> ⚑ 리팩토링 코드 (a) </a>
<a href="https://github.com/vanillacoding/fullstack-bootcamp17-w08/blob/07192632b636bf17ce1f300373445152e23e4b77/src/02_Functional/01_pure/shoppingCart.js#L14-L51"> ⚑ [shoppingCart.js] 리팩토링 코드 (b)(c) </a>
<a href="https://github.com/vanillacoding/fullstack-bootcamp17-w08/blob/07192632b636bf17ce1f300373445152e23e4b77/src/02_Functional/02_referential_transparency/students.js#L3-L29"> ⚑ [students.js] 리팩토링 코드 (b)(c) </a>
<a href="https://github.com/vanillacoding/fullstack-bootcamp17-w08/blob/07192632b636bf17ce1f300373445152e23e4b77/src/02_Functional/01_pure/shoppingCart.js#L41"> ⚑ [shoppingCart.js] 리팩토링 코드 (+) </a>
<a href="https://github.com/vanillacoding/fullstack-bootcamp17-w08/blob/07192632b636bf17ce1f300373445152e23e4b77/src/02_Functional/01_pure/shoppingCart.js#L41"> ⚑ [students.js] 리팩토링 코드 (+) </a>

**4. 기대 효과**

함수 동작으로 인해 입력값과 전역 변수의 상태의 변화(**불변성**)를 걱정하지 않아도 된다. (**디버깅, 테스트 용이**)

**5. 우려점**

함수가 동작할 때마다 참조형 데이터를 복사하고 생성하기 때문에 성능이 저하될 수 있다. 

<p align="left"><a href="#top">⬆ 과제 상세 </a></p>

<br>

### 함수 합성
_Function Composition_

**1. 정의**

여러 개의 함수를 결합하여 새로운 함수를 만드는 기법

**2. 문제 상황**

**a.**`validatePassword()`와 `validateUsername()` 두 함수 모두 순수 함수가 아니다.
**b.**`validatePassword()`와 `validateUsername()` 두 함수 내부에 나열된 조건들이 코드의 가독성을 저해하고 있다.
 
**3. 해결 방안**

**a.** 두 함수 내부의 조건을 순수 함수의 형태로 작게 분리한다.
**b.** 분리한 함수들을 결합한다.

<a href="https://github.com/vanillacoding/fullstack-bootcamp17-w08/blob/07192632b636bf17ce1f300373445152e23e4b77/src/02_Functional/03_composition/validator.js#L1-L53"> ⚑ 리팩토링 코드 (a) </a>
<a href="https://github.com/vanillacoding/fullstack-bootcamp17-w08/blob/07192632b636bf17ce1f300373445152e23e4b77/src/02_Functional/03_composition/validator.js#L55-L76"> ⚑ 리팩토링 코드 (b) </a>

**4. 기대 효과**

내부 조건들을 함수로 순수 함수로 분리하면서 username과 password에서 함께 사용할 수 있도록 코드의 중복을 줄일 수 있다 (**재사용성**)
`&&` 연산자보다 합성 함수를 사용하여 코드를 읽기 쉽게 만들 수 있다.  (**가독성**)


**5. 우려점**

함수를 합치는 함수는 작성한 사람을 제외하고는 이해하는데 어려움이 발생한다. (**유지보수성**)
함수 합성이 길어질 수록 함수 호출이 많아져 추가적으로 시간, 메모리가 사용될 위험(**오버헤드**)이 발생한다. (**성능문제**)

<p align="left"><a href="#top">⬆ 과제 상세 </a></p>

-----------------------------------------------------------------------------------------------------------------------

### ✗ 추후 보완해야 할 목록

- 리뷰를 통한 수정
- 디자인 패턴 접목
- 각 우려점에 대한 대안책 제시
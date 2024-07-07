/*
 *
 * 아래에 주어진 코드를 다음 절차에 따라 2가지 버전으로 리팩터링 해보세요.
 *
 * 버전 #1: 비동기 로직을 프로미스화 하여 리팩터링 하기
 * 버전 #2: 비동기 로직을 async/await 활용하여 리팩터링 하기
 *
 * 코드의 재사용성을 고려하여 자유롭게 리팩터링 해보세요.
 * 특별한 제약 사항은 없지만, 기능적으로 동일함을 유지해야만 합니다.
 *
 */

for (let i = 0; i < 10; i++) {
  setTimeout(function () {
    console.log(i);
  }, i * 100);
}

/*
 *
 * 리팩터링 버전 #1: 프로미스
 *
 */

function countNumber(number) {
  return function () {
    return new Promise(function (resolve) {
      setTimeout(function () {
        const newNumber = number;

        console.log(newNumber);
        resolve(newNumber);
      }, 100);
    });
  };
}

countNumber(0)()
  .then(countNumber(1))
  .then(countNumber(2))
  .then(countNumber(3))
  .then(countNumber(4))
  .then(countNumber(5))
  .then(countNumber(6))
  .then(countNumber(7))
  .then(countNumber(8))
  .then(countNumber(9));
/****************************/

/*
 *
 * 리팩터링 버전 #2: async/await
 *
 */

async function countNumber(number) {
  await new Promise(function (resolve) {
    setTimeout(function () {
      const newNumber = number;

      console.log(newNumber);
      resolve(newNumber);
    }, 100);
  });
}

async function executeFunctions() {
  await countNumber(0);
  await countNumber(1);
  await countNumber(2);
  await countNumber(3);
  await countNumber(4);
  await countNumber(5);
  await countNumber(6);
  await countNumber(7);
  await countNumber(8);
  await countNumber(9);
}

executeFunctions();

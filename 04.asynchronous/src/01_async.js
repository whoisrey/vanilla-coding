/*
 *
 * ✅ 작성되어 있지 않은 함수들의 내용을 완성해 주세요!
 *
 */

const async = {};

/*
 *
 * parallel은 비동기 작업의 병렬 처리를 도와주는 유틸 함수입니다.
 *
 * 예를 들어, 회사 전산 시스템에서 직원들의 인사 정보를 불러오는 상황을 생각해보세요.
 * 총 직원 수는 1000명이며, 직원 한명의 정보를 불러오는데 10초의 시간이 소요됩니다.
 * 각 직원 정보 간에는 아무런 의존성이 없습니다.
 *
 * 그렇다면 이런 경우, 직렬 방식으로 처리한다면 10초씩 1000명.. 즉 10000초가 소요될 것입니다.
 * 하지만 병렬로 처리한다면, 10초의 시간이면 충분합니다.
 *
 * 우리가 만들 함수는 이런 병렬 처리를 도와주는 조력자 역할을 할 수 있습니다.
 *
 * < 함수 소개 >
 *
 * parallel 함수는 2개의 인자를 받습니다.
 *
 * 첫 번째 인자는 `tasks`라고 부르는 배열,
 * 두 번째 인자는 `finalCallback`이라고 부르는 함수입니다.
 *
 * `tasks` 배열에는 비동기 작업을 수행하는 함수들이 담겨있고, 갯수에는 제한이 없습니다.
 * `tasks`에 담긴 함수(편의상 foo라고 칭함)들은 각각 비동기 작업이 완료되었을때,
 * 각 foo 함수에 인자로 주어진 함수를 호출하여 비동기 작업이 완료되었음을 알려줍니다.
 *
 * 여러분은 `tasks` 배열에 담긴 함수들이 병렬적으로 실행되도록 해주고,
 * 모든 `tasks`가 완료되었을때 `finalCallback`을 호출해주셔야 합니다.
 *
 * 자세한 내용은 관련 테스트 코드를 참고하세요!
 *
 * Piece 👍🏻
 */

async.parallel = function parallel(tasks, finalCallback) {
  const results = [];
  let count = 0;

  if (tasks.length === 0) return finalCallback();

  for (let index = 0; index < tasks.length; index++) {
    const task = tasks[index];

    task(function (result) {
      results[index] = result;
      count++;
      if (count === tasks.length) finalCallback(results);
    });
  }
};

/*
 *
 * waterfall은 비동기 작업의 직렬 처리를 도와주는 유틸 함수입니다.
 *
 * 예를 들어, 여러분이 대한민국에서 외국인등록증을 발급받아야 한다고 생각해보세요.
 * 절차는 다음과 같습니다.
 *
 * 1. ATM 현금 출금
 * 2. 수입인지 구매
 * 3. 외국인등록증 신청
 *
 * 위에 나열된 각 단계는 순서가 중요하며, 1번보다 2번을 먼저 수행할 수 없습니다.
 * 또한 1번 단계의 결과물(현금)을 2번 단계에서 필요로 합니다.
 *
 * 각 단계가 20초씩 소요된다면, 위 과정은 총 60초 소요될 수 밖에 없습니다.
 * 병렬적으로 처리할 수는 없는 상황입니다.
 *
 * 이렇게 때에 따라 병렬이 아닌 직렬 방식으로 비동기 작업을 수행해야 하는 경우도 있습니다.
 * 우리가 이번에 만들 함수는 이런 직렬 방식의 작업을 도와주는 조력자입니다.
 *
 * < 함수 소개 >
 *
 * waterfall 함수는 2개의 인자를 받습니다.
 *
 * 첫 번째 인자는 `tasks`라고 부르는 배열,
 * 두 번째 인자는 `finalCallback`이라고 부르는 함수입니다.
 *
 * `tasks` 배열에는 비동기 작업을 수행하는 함수들이 담겨있고, 갯수에는 제한이 없습니다.
 * `tasks`에 담긴 함수(편의상 foo라고 칭함)들은 각각 비동기 작업이 완료되었을때,
 * 각 foo 함수에 인자로 주어진 함수를 호출하여 비동기 작업이 완료되었음을 알려줍니다.
 *
 * 여러분은 `tasks` 배열에 담긴 함수들이 직렬적으로 실행되도록 해주고,
 * 각 task의 결과가 존재한다면 그 결과를 foo함수에 함께 넘겨줄 수 있도록 해야 합니다.
 * 그리고 최종적으로 모든 `tasks`가 완료되었을때 `finalCallback`을 호출해주셔야 합니다.
 *
 * 자세한 내용은 관련 테스트 코드를 참고하세요!
 *
 * Piece 👍🏻
 */
async.waterfall = function waterfall(tasks, finalCallback) {
  let index = 0;

  if (tasks.length === 0) return finalCallback();

  function callback(result) {
    index++;

    index === tasks.length ? finalCallback(result) : executeTasks(result);
  }

  function executeTasks(result) {
    if (result === undefined) {
      tasks[index](callback);
    } else {
      tasks[index](result, callback);
    }
  }

  executeTasks();
};

/*
 *
 * each는 비동기 작업의 병렬 처리를 도와주는 유틸 함수입니다.
 *
 * < 함수 소개 >
 *
 * each 함수는 3개의 인자를 받습니다.
 *
 * 첫 번째 인자는 `list`라고 부르는 데이터,
 * 두 번째 인자는 비동기 함수인 `iteratee`,
 * 세 번째 인자는 `finalCallback`이라고 부르는 함수입니다.
 *
 * `list` 배열에는 비동기 작업의 대상이 되는 데이터가 담겨있습니다.
 * `iteratee`는 각각의 데이터에 대해 실행해야 할 비동기 함수입니다.
 * `finalCallback`은 모든 데이터에 대한 비동기 작업이 완료되었을때 실행해야 할 함수입니다.
 *
 * 자세한 내용은 관련 테스트 코드를 참고하세요!
 *
 * Piece 👍🏻
 */
async.each = function each(list, iteratee, finalCallback) {
  let count = 0;

  if (list.length === 0) finalCallback();

  function callback() {
    count++;

    if (count === list.length) finalCallback();
  }

  function applyToElement() {
    for (const element of list) {
      iteratee(element, callback);
    }
  }

  applyToElement();
};

/*
 *
 * map은 비동기 작업의 병렬 처리를 도와주는 유틸 함수입니다.
 *
 * < 함수 소개 >
 *
 * map 함수는 3개의 인자를 받습니다.
 *
 * 첫 번째 인자는 `list`라고 부르는 데이터,
 * 두 번째 인자는 비동기 함수인 `iteratee`,
 * 세 번째 인자는 `finalCallback`이라고 부르는 함수입니다.
 *
 * `list` 배열에는 비동기 작업의 대상이 되는 데이터가 담겨있습니다.
 * `iteratee`는 각각의 데이터에 대해 실행해야 할 비동기 함수입니다.
 * `finalCallback`은 모든 데이터에 대한 비동기 작업이 완료되었을때 실행해야 할 함수입니다.
 * `finalCallback`은 `iteratee`로부터 각 비동기 작업에 대한 결과를 전달받습니다.
 *
 * 자세한 내용은 관련 테스트 코드를 참고하세요!
 *
 * Piece 👍🏻
 */
async.map = function map(list, iteratee, finalCallback) {
  const results = [];
  let count = 0;

  function callback(element, index) {
    results[index] = element;
    count++;

    if (count === list.length) finalCallback(results);
  }

  function applyToElement() {
    for (let index = 0; index < list.length; index++) {
      iteratee(list[index], function (element) {
        callback(element, index);
      });
    }
  }

  applyToElement();
};

/*
 *
 * reduce는 비동기 작업의 직렬 처리를 도와주는 유틸 함수입니다.
 *
 * < 함수 소개 >
 *
 * reduce 함수는 4개의 인자를 받습니다.
 *
 * 첫 번째 인자는 `list`라고 부르는 데이터,
 * 두 번째 인자는 초기값인 `initialValue`,
 * 세 번째 인자는 비동기 함수인 `iteratee`,
 * 네 번째 인자는 `finalCallback`이라고 부르는 함수입니다.
 *
 * `list` 배열에는 비동기 작업의 대상이 되는 데이터가 담겨있습니다.
 * `initialValue`는 초기값으로 지정되는 값입니다.
 * `iteratee`는 각각의 데이터에 대해 실행해야 할 비동기 함수입니다.
 * `finalCallback`은 모든 비동기 작업이 완료되었을때 실행해야 할 함수입니다.
 *
 * 자세한 내용은 관련 테스트 코드를 참고하세요!
 *
 * Piece 👍🏻
 */
async.reduce = function reduce(list, initialValue, iteratee, finalCallback) {
  let index = 0;

  function callback(element) {
    initialValue = element;
    index++;

    index === list.length ? finalCallback(element) : applyToElement();
  }

  function applyToElement() {
    iteratee(initialValue, list[index], callback);
  }

  applyToElement();
};

/*
 *
 * memoize는 비동기 함수의 caching을 도와주는 유틸 함수입니다.
 *
 * < 함수 소개 >
 *
 * memoize 함수는 1개의 인자를 받습니다.
 *
 * `func`은 비동기 작업을 수행하는 함수입니다.
 *
 * 자세한 내용은 관련 테스트 코드를 참고하세요!
 *
 * Piece 👍🏻
 */
async.memoize = function memoize(func) {
  const cache = {};

  return function (...args) {
    const callback = args.pop();
    const key = JSON.stringify(...args);

    if (key in cache) {
      callback(cache[key]);
    } else {
      func(...args, function (result) {
        cache[key] = result;
        callback(cache[key]);
      });
    }
  };
};

/*
 *
 * promisify는 비동기 함수의 콜백 패턴 인터페이스를 프러미스로 변환해주는 유틸 함수입니다.
 *
 * < 함수 소개 >
 *
 * promisify 함수는 1개의 인자를 받습니다.
 *
 * `func`은 비동기 작업을 수행하는 함수입니다.
 *
 * 자세한 내용은 관련 테스트 코드를 참고하세요!
 *
 * Piece 👍🏻
 */
async.promisify = function promisify(func) {
  return function (...args) {
    return new Promise(function (resolve, reject) {
      func(...args, function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  };
};

export default async;

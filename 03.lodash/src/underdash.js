/*
 *
 * ✅작성되어 있지 않은 함수들의 내용을 완성해 주세요!
 *
 * ⛔️이미 작성이 완료된 함수의 내용은 수정/삭제하지 마세요.
 * ⛔️이미 작성이 완료된 함수의 내용은 반드시 이해하셔야 합니다.
 *
 */

const _ = {};

/**
 *
 * "identity"
 *
 * https://lodash.com/docs/4.17.15#identity
 *
 */
_.identity = function (value) {
  return value;
};

/**
 *
 * "each"
 *
 * https://lodash.com/docs/4.17.15#forEach
 *
 * 자바스크립트 배열의 forEach 메소드와 거의 동일한 함수입니다.
 *
 */
_.each = function (array, iterator) {
  for (let i = 0; i < array.length; i++) {
    if (array[i]) {
      iterator(array[i], i, array);
    }
  }
};

/**
 *
 * [수정하지 마세요.] "indexOf"
 *
 * https://lodash.com/docs/4.17.15#indexOf
 *
 * 자바스크립트 배열의 indexOf 메소드와 거의 동일한 함수입니다.
 *
 */
_.indexOf = function (array, target) {
  let result = -1;

  _.each(array, function (item, index) {
    if (item === target && result === -1) {
      result = index;
    }
  });

  return result;
};

/**
 *
 * "slice"
 *
 * https://lodash.com/docs/4.17.15#slice
 *
 * 자바스크립트 배열의 slice 메소드와 거의 동일한 함수입니다.
 *
 */
_.slice = function (array, start = 0, end = array.length) {
  const slicedArray = [];
  const startIndex = start >= 0 ? start : start + array.length;
  const endIndex = end >= 0 ? end : end + array.length;

  for (let i = startIndex; i < endIndex; i++) {
    slicedArray.push(array[i]);
  }

  return slicedArray;
};

/**
 *
 * "map"
 *
 * https://lodash.com/docs/4.17.15#map
 *
 * 자바스크립트 배열의 map 메소드와 거의 동일한 함수입니다.
 *
 */
_.map = function (array, iterator) {
  const mappedArray = [];
  for (let i = 0; i < array.length; i++) {
    mappedArray.push(iterator(array[i], i, array));
  }

  return mappedArray;
};
/**
 *
 * "reduce"
 *
 * https://lodash.com/docs/4.17.15#reduce
 *
 * 자바스크립트 배열의 reduce 메소드와 거의 동일한 함수입니다.
 *
 * 아래 한글 MDN 문서에서 매개변수, 반환값, 작동방식 부분을 반드시 꼼꼼히 읽고 이해한 후, 도전하세요.
 * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 */
_.reduce = function (array, iterator, accumulator = array[0]) {
  const startIndex = accumulator === array[0] ? 1 : 0;
  for (let i = startIndex; i < array.length; i++) {
    accumulator = iterator(accumulator, array[i], i, array);
  }

  return accumulator;
};

/**
 *
 * [수정하지 마세요] "includes"
 *
 * 자바스크립트 배열의 includes 메소드와 거의 동일한 함수입니다.
 *
 * `reduce`가 성공적으로 완성된다면, `includes` 또한 통과됩니다.
 * 만약 `includes` 테스트가 실패한다면, `reduce`에 작성한 로직이 잘못 되었을 수 있습니다.
 *
 */
_.includes = function (array, target) {
  // TIP: Many iteration problems can be most easily expressed in
  // terms of reduce(). Here's a freebie to demonstrate!
  return _.reduce(
    array,
    function (wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    },
    false
  );
};

/**
 *
 * "flatten"
 *
 * https://lodash.com/docs/4.17.15#flatten
 *
 *
 */
_.flatten = function (nestedArray) {
  const spreadArray = [];
  const arrayInArray = [];

  for (const element of nestedArray) {
    typeof element !== "object"
      ? spreadArray.push(element)
      : spreadArray.push(...element);
  }

  for (const element of spreadArray) {
    if (typeof element === "object") {
      arrayInArray.push(element);
      _.flatten(spreadArray);
    } else {
      continue;
    }
  }

  return arrayInArray.length === 0 ? spreadArray : _.flatten(spreadArray);
};

/**
 *
 * "extend"
 *
 * https://lodash.com/docs/4.17.15#assignIn
 *
 *
 */
_.extend = function (obj, ...sources) {
  for (const element of sources) {
    for (const key in element) {
      obj[key] = element[key];
    }
  }

  return obj;
};

/**
 *
 * "defaults"
 *
 * https://lodash.com/docs/4.17.15#defaults
 *
 *
 */
_.defaults = function (obj, ...sources) {
  for (const element of sources) {
    for (const key in element) {
      if (!obj[key] && obj[key] !== null) obj[key] = element[key];
    }
  }

  return obj;
};

/**
 *
 * "create"
 *
 * https://lodash.com/docs/4.17.15#create
 *
 *
 */
_.create = function (prototype) {
  return Object.create(prototype);
};

/**
 *
 * "forOwn"
 *
 * https://lodash.com/docs/4.17.15#forOwn
 *
 *
 */
_.forOwn = function (obj, iterator) {
  for (const i in obj) {
    if (Object.hasOwn(obj, i)) {
      iterator(obj[i], i);
    }
  }
};

/**
 *
 * "throttle"
 *
 * https://lodash.com/docs/4.17.15#throttle
 *
 *
 */
_.throttle = function (func, wait) {
  let delay = false;
  return function () {
    if (!delay) {
      func();
      delay = true;

      setTimeout(() => (delay = false), wait);
    }
  };
};

/**
 *
 * "memoize"
 *
 * https://lodash.com/docs/4.17.15#memoize
 *
 *
 */
_.memoize = function (func) {
  const cache = {};
  return function (...args) {
    const key = JSON.stringify(args);
    if (key in cache) {
      return cache[key];
    } else {
      cache[key] = func(...args);
      return cache[key];
    }
  };
};

/**
 *
 * "curry"
 *
 * https://lodash.com/docs/4.17.15#curry
 *
 *
 */
_.curry = function (func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func(...args);
    } else {
      return function (...args2) {
        return curried(...args, ...args2);
      };
    }
  };
};

/**
 *
 * "compose"
 *
 * 테스트 코드의 내용을 참고하세요.
 *
 */
_.compose = function (...funcList) {
  // let count = 1;
  // return function reCompose(...args) {
  //   const lastIndex = funcList.length;
  //   const result = funcList[lastIndex - count](...args);
  //   console.log(result);
  //   count++;
  //   if (count > lastIndex) {
  //     return result;
  //   } else {
  //     return reCompose(result);
  //   }
  // };
  return function (x) {
    return funcList.reduceRight((v, f) => f(v), x);
  };
};

export default _;

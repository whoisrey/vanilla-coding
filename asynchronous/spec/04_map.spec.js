import { expect, describe, it } from "vitest";
import async from "../src/01_async";

describe("map", function () {
  it("basic", () =>
    new Promise(function (done, reject) {
      const callOrder = [];
      const list = [1, 3, 2];

      function mapIteratee(x, callback) {
        setTimeout(function () {
          callOrder.push(x);

          // NOTE: 각 mapping에 대한 결과값을 아래 (x * 2)와 같이 전달합니다.
          callback(x * 2);
        }, x * 25);
      }

      function finalCallback(result) {
        try {
          expect(callOrder).toEqual([1, 2, 3]);
          expect(result).toEqual([2, 6, 4]);
          done();
        } catch (e) {
          reject(e);
        }
      }

      async.map(list, mapIteratee, finalCallback);
    }));

  it("map original untouched - 원본 배열은 수정되어서는 안된다.", () =>
    new Promise(function (done, reject) {
      const list = [1, 2, 3];

      function mapIteratee(x, callback) {
        callback(x * 2);
      }

      function finalCallback(results) {
        try {
          expect(results).toEqual([2, 4, 6]);
          expect(list).toEqual([1, 2, 3]);
          done();
        } catch (e) {
          reject(e);
        }
      }

      async.map(list, mapIteratee, finalCallback);
    }));
});

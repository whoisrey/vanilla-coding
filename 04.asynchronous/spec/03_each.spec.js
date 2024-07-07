import { expect, describe, it, vi } from "vitest";
import async from "../src/01_async";

describe("each", function () {
  it("each", () =>
    new Promise(function (done, reject) {
      const args = [];

      const list = [1, 3, 2];

      function eachIteratee(value, callback) {
        // NOTE: 각 배열 요소에 대한 setTimeout의 시간을 잘 살펴보세요.
        setTimeout(function () {
          args.push(value);
          callback();
        }, value * 25);
      }

      function finalCallback() {
        try {
          expect(args).toEqual([1, 2, 3]);
          done();
        } catch (e) {
          reject(e);
        }
      }

      async.each(list, eachIteratee, finalCallback);
    }));

  it("each empty array - iteratee는 실행되지 않고, 최종 콜백이 즉시 실행되어야 한다.", () =>
    new Promise(function (done, reject) {
      const list = [];

      function eachIteratee(value, callback) {
        callback();
      }

      const iterateeSpy = vi.fn(eachIteratee);
      const finalCallback = vi.fn(function () {});

      async.each(list, iterateeSpy, finalCallback);

      try {
        expect(iterateeSpy).toHaveBeenCalledTimes(0);
        expect(finalCallback).toHaveBeenCalledTimes(1);
        done();
      } catch (e) {
        reject(e);
      }
    }));
});

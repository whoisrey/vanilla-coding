import { expect, describe, it } from "vitest";
import async from "../src/01_async";

describe("Waterfall", function () {
  it("태스크 리스트와 최종 콜백을 파라미터로 전달받고, 최종 콜백을 실행시켜야 한다.", () =>
    new Promise(function (done) {
      function finalCallback() {
        done();
      }

      async.waterfall([], finalCallback);
    }));

  it("각 태스크는 콜백 함수를 파라미터로 넘겨주어야 한다.", () =>
    new Promise(function (done, reject) {
      const order = [];

      const tasks = [
        function taskOne(callback) {
          order.push(1);
          callback();
        },
        function taskTwo(callback) {
          order.push(2);
          callback();
        },
        function taskThree(callback) {
          order.push(3);
          callback();
        },
      ];

      function finalCallback() {
        try {
          expect(order).toEqual([1, 2, 3]);
          done();
        } catch (e) {
          reject(e);
        }
      }

      async.waterfall(tasks, finalCallback);
    }));

  it("각 비동기 태스크를 직렬적으로 진행해야 한다.", () =>
    new Promise(function (done, reject) {
      const order = [];

      async.waterfall(
        [
          function taskOne(callback) {
            setTimeout(function oneDone() {
              order.push(1);
              callback();
            }, 250);
          },
          function taskTwo(callback) {
            setTimeout(function twoDone() {
              order.push(2);
              callback();
            }, 400);
          },
          function taskThree(callback) {
            setTimeout(function threeDone() {
              order.push(3);
              callback();
            }, 100);
          },
        ],
        function finalCallback() {
          try {
            expect(order).toEqual([1, 2, 3]);
            done();
          } catch (e) {
            reject(e);
          }
        }
      );
    }));

  it("이전 태스크의 결과가 존재할 경우, 다음 태스크에 전달해야 한다.", () =>
    new Promise(function (done, reject) {
      const order = [];

      async.waterfall(
        [
          function taskOne(callback) {
            setTimeout(function oneDone() {
              order.push(1);
              callback("첫 번째 결과");
            }, 250);
          },
          function taskTwo(one, callback) {
            expect(one).toBe("첫 번째 결과");

            setTimeout(function twoDone() {
              order.push(2);
              callback();
            }, 100);
          },
          function taskThree(callback) {
            setTimeout(function threeDone() {
              order.push(3);
              callback("최종 결과");
            }, 10);
          },
        ],
        function finalCallback(result) {
          try {
            expect(result).toBe("최종 결과");
            expect(order).toEqual([1, 2, 3]);
            done();
          } catch (e) {
            reject(e);
          }
        }
      );
    }));
});

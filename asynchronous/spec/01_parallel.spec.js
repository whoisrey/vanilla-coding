import { expect, describe, it } from "vitest";
import async from "../src/01_async";

describe("Parallel", function () {
  it("태스크 리스트와 최종 콜백을 파라미터로 전달받고, 최종 콜백을 실행시켜야 한다.", () =>
    new Promise(function (done) {
      function finalCallback() {
        done();
      }

      async.parallel([], finalCallback);
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

      async.parallel(tasks, finalCallback);
    }));

  it("태스크가 여러 개인 경우 모든 태스크 실행이 종료된 이후, 최종 콜백을 호출해야 한다.", () =>
    new Promise(function (done, reject) {
      const order = [];

      async.parallel(
        [
          function (callback) {
            order.push(1);
            callback();
          },
          function (callback) {
            order.push(2);
            callback();
          },
          function (callback) {
            order.push(4);
            callback();
          },
          function (callback) {
            order.push(3);
            callback();
          },
          function (callback) {
            order.push(6);
            callback();
          },
        ],
        function finalCallback() {
          try {
            order.push(9);
            expect(order).toEqual([1, 2, 4, 3, 6, 9]);
            done();
          } catch (e) {
            reject(e);
          }
        }
      );
    }));

  it("A. 병렬적으로 모든 비동기 태스크를 진행해야 한다.", () =>
    new Promise(function (done, reject) {
      const order = [];

      async.parallel(
        [
          function (callback) {
            setTimeout(function () {
              order.push(4);
              callback();
            }, 100);
          },
          function (callback) {
            setTimeout(function () {
              order.push(2);
              callback();
            }, 150);
          },
          function (callback) {
            setTimeout(function () {
              order.push(1);
              callback();
            }, 200);
          },
        ],
        function () {
          try {
            expect(order).toEqual([4, 2, 1]);
            done();
          } catch (e) {
            reject(e);
          }
        }
      );
    }));

  it("B. 병렬적으로 모든 비동기 태스크를 진행해야 한다.", () =>
    new Promise(function (done, reject) {
      const order = [];

      async.parallel(
        [
          function (callback) {
            setTimeout(function () {
              order.push(4);
              callback();
            }, 200);
          },
          function (callback) {
            setTimeout(function () {
              order.push(2);
              callback();
            }, 100);
          },
          function (callback) {
            setTimeout(function () {
              order.push(1);
              callback();
            }, 150);
          },
        ],
        function () {
          try {
            expect(order).toEqual([2, 1, 4]);
            done();
          } catch (e) {
            reject(e);
          }
        }
      );
    }));

  it("비동기 태스크의 결과를 최종 콜백에 전달해주어야 한다.", () =>
    new Promise(function (done, reject) {
      const order = [];

      async.parallel(
        [
          function (callback) {
            setTimeout(function () {
              order.push(1);
              callback(1);
            }, 150);
          },
          function (callback) {
            setTimeout(function () {
              order.push(2);
              callback("2");
            }, 300);
          },
          function (callback) {
            setTimeout(function () {
              order.push(3);
              callback({ data: 3 });
            }, 10);
          },
        ],
        function (results) {
          try {
            expect(order).toEqual([3, 1, 2]);
            // KEN: result는 위 태스크 callback에서 넘겨준 데이터의 자료형이나 그 "내용"에 관계없이 포함하여야 합니다.
            expect(results).toEqual([1, "2", { data: 3 }]);
            done();
          } catch (e) {
            reject(e);
          }
        }
      );
    }));
});

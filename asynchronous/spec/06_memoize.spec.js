import { expect, describe, it, vi } from "vitest";
import async from "../src/01_async";

describe("memoize", function () {
  it("memoize", () =>
    new Promise((done, reject) => {
      const callOrder = [];

      function heavyCalculate(arg1, arg2, callback) {
        setTimeout(() => {
          callOrder.push(["fn", arg1, arg2]);

          // NOTE: 아래와 같이 연산의 결과를 전달합니다.
          callback(arg1 + arg2);
        }, 0);
      }

      const spiedHeavyCalculate = vi.fn(heavyCalculate);
      const memoizedFn = async.memoize(spiedHeavyCalculate);

      // 비동기 작업 #1: (1, 2)를 인자로 전달하여 최초 호출.
      // NOTE: (1, 2)를 이용한 "최초" 호출이기 때문에
      // spiedHeavyCalculate 함수를 호출하여 연산이 필요합니다.
      memoizedFn(1, 2, (result) => {
        try {
          expect(result).toBe(3);
          expect(spiedHeavyCalculate).toHaveBeenCalledTimes(1);
        } catch (e) {
          reject(e);
        }

        // 비동기 작업 #2: 비동기 작업 #1이 완료된 이후,
        // NOTE: (1, 2)를 이용한 "두번째" 호출이기 때문에
        // spiedHeavyCalculate 함수 호출을 생략하고
        // 이전에 연산했던 결과를 바로 받아와야 합니다.
        memoizedFn(1, 2, (result2) => {
          try {
            expect(result2).toBe(3);
            expect(spiedHeavyCalculate).toHaveBeenCalledTimes(1);
          } catch (e) {
            reject(e);
          }

          // 비동기 작업 #3: 비동기 작업 #1과 #2가 완료된 이후,
          // NOTE: (2, 2)를 이용한 "최초" 호출이기 때문에
          // spiedHeavyCalculate 함수를 호출하여 연산이 필요합니다.
          memoizedFn(2, 2, (result3) => {
            try {
              expect(result3).toBe(4);
              expect(callOrder).toEqual([
                ["fn", 1, 2],
                ["fn", 2, 2],
              ]);

              // NOTE: 누적 연산 횟수는 총 2회 입니다.
              expect(spiedHeavyCalculate).toHaveBeenCalledTimes(2);
              done();
            } catch (e) {
              reject(e);
            }
          });
        });
      });
    }));
});

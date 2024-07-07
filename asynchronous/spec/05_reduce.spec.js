import { expect, describe, it } from "vitest";
import async from "../src/01_async";

describe("reduce", function () {
  it("reduce 1", () =>
    new Promise(function (done, reject) {
      const callOrder = [];
      const list = [1, 2, 3];
      const initialValue = 0;

      function reduceIteratee(acc, value, callback) {
        callOrder.push(value);
        callback(acc + value);
      }

      function finalCallback(result) {
        try {
          expect(result).toBe(6);
          expect(callOrder).toEqual([1, 2, 3]);
          done();
        } catch (e) {
          reject(e);
        }
      }

      async.reduce(list, initialValue, reduceIteratee, finalCallback);
    }));

  it("reduce 2", () =>
    new Promise(function (done) {
      const callOrder = [];
      const list = [10, 20, 30];
      const initialValue = 1;

      function reduceIteratee(acc, value, callback) {
        callOrder.push(value);
        callback(acc * value);
      }

      function finalCallback(result) {
        try {
          expect(result).toBe(6000);
          expect(callOrder).toEqual([10, 20, 30]);
          done();
        } catch (e) {
          reject(e);
        }
      }

      async.reduce(list, initialValue, reduceIteratee, finalCallback);
    }));

  it("reduce async", () =>
    new Promise(function (done, reject) {
      const list = [1, 3, 2];
      const initialValue = 0;

      function reduceIteratee(acc, value, callback) {
        setTimeout(function () {
          callback(acc + value);
        }, Math.random() * 100);
      }

      function finalCallback(result) {
        try {
          expect(result).toBe(6);
          done();
        } catch (e) {
          reject(e);
        }
      }

      async.reduce(list, initialValue, reduceIteratee, finalCallback);
    }));
});

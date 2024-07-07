import { describe, assert, it } from "vitest";
import async from "../src/01_async";

describe("promisify", function () {
  function noop() {}

  function doSomethingAsync(n, callback) {
    setTimeout(function () {
      if (n > 10) return callback("error!");
      callback(null, n * 10);
    }, 1000);
  }

  it("type", function () {
    const fn = async.promisify(doSomethingAsync);

    assert(typeof fn === "function", "should return a function");
  });

  it("return type", function () {
    const fn = async.promisify(doSomethingAsync);
    const result = fn(0, noop);

    assert(result instanceof Promise, "should return a promise");
    assert(typeof result.then === "function", "should have then method");
    assert(typeof result.catch === "function", "should have catch method");
  });

  it("success", function () {
    const fn = async.promisify(doSomethingAsync);

    return fn(5)
      .then(function (result) {
        assert(result === 50, "result should be 10 times n");
      })
      .catch(function () {
        assert(false, "should not be called.");
      })
      .finally(function () {
        assert(true, "should be called.");
      });
  });

  it("error", function () {
    const fn = async.promisify(doSomethingAsync);

    return fn(100)
      .then(function () {
        assert(false, "should not be called.");
      })
      .catch(function (err) {
        assert(err === "error!", "error should be passed");
      })
      .finally(function () {
        assert(true, "should be called.");
      });
  });

  function doSomethingComplicatedAsync(a, b, c, callback) {
    setTimeout(function () {
      if (a * b + c > 100) {
        return callback("error!");
      }

      callback(null, a * b + c);
    }, 1000);
  }

  it("any number of arguments", async function () {
    const fn = async.promisify(doSomethingComplicatedAsync);

    // WARNING: You should NOT use async/await in your solution.
    try {
      const result = await fn(10, 2, 5);

      assert(result === 25, "result should be 10 times n");
    } catch (err) {
      assert(false, "should not be called.");
    }
  });
});

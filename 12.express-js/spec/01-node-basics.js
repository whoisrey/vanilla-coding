const request = require("supertest");
const { expect } = require("chai");
const server = require("../practice/01-node-basics/app");

function makeRandomString(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

describe("01. Node Basics", () => {
  describe("01-1. GET `/`", () => {
    it("should respond with html template in static directory", (done) => {
      request(server)
        .get("/")
        .expect("Content-Type", "text/html")
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.include("HTML Template");
          done();
        });
    });
  });

  describe("01-2. GET to every other urls", () => {
    it("should respond with `Hello World` text", (done) => {
      request(server)
        .get(`/${makeRandomString(10)}`)
        .expect("Content-Type", "text/plain")
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.include("Hello World");
          done();
        });
    });
  });
});

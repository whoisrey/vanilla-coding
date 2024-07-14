const request = require("supertest");
const { expect } = require("chai");
const { readFile } = require("fs");
const path = require("path");
const server = require("../practice/02-form-handling/app");

describe("02. Form Handling", () => {
  describe("02-1. GET `/signup`", () => {
    it("should respond with signup template in static directory", (done) => {
      request(server)
        .get("/signup")
        .expect("Content-Type", "text/html")
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.include("Sign up Form");
          done();
        });
    });
  });

  describe("02-2. POST `/signup`", () => {
    it("should success when an username is given", (done) => {
      const username = "Ken";
      request(server)
        .post("/signup")
        .set("Content-Type", "multipart/form-data")
        .field("username", username)
        .expect("Content-Type", "text/plain")
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.include("Success");

          readFile(
            path.join(__dirname, "../practice/02-form-handling/users.txt"),
            "utf8",
            (err, data) => {
              const hasUsername = data.indexOf(username) !== -1;
              expect(hasUsername).to.be.true;
            }
          );
          done();
        });
    });
  });
});

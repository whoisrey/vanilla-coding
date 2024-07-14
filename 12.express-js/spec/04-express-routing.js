const request = require("supertest");
const randomstring = require("randomstring");
const { expect } = require("chai");
const app = require("../app");

describe("04. Express routings", () => {
  /*

    [ Handling POST request ]

  */
  describe("04-1. POST `/`", () => {
    it("should respond with success template", (done) => {
      const randomString = randomstring.generate();

      request(app)
        .post("/")
        .send({ title: randomString })
        .expect("Content-Type", /html/)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.include("Success");
          expect(res.text).to.include(randomString);
          done();
        });
    });
  });

  /*

    [ Redirect ]
    http://expressjs.com/ko/api.html#res.redirect
    http://expressjs.com/en/api.html#res.redirect

  */
  describe("04-2.  GET `/google`", () => {
    it("should redirect to google", (done) => {
      request(app)
        .get("/google")
        .expect("Content-Type", /plain/)
        .expect(302)
        .expect("Location", "http://www.google.com")
        .end(done);
    });
  });

  /*

    [ Accessing an invalid url ]
    https://expressjs.com/ko/starter/faq.html
    https://expressjs.com/en/starter/faq.html

  */
  describe("04-3. GET `/not-valid-url`", () => {
    it("should respond with error template", (done) => {
      const randomString = randomstring.generate();

      request(app)
        .get(`/${randomString}`)
        .expect("Content-Type", /html/)
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.include("404");
          done();
        });
    });
  });
});

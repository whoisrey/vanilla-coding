const request = require("supertest");
const { expect } = require("chai");
const app = require("../app");

describe("03. Express basics", () => {
  /*

    [ Serving a HTML page ]
    https://expressjs.com/ko/guide/using-template-engines.html
    https://expressjs.com/en/guide/using-template-engines.html

  */
  describe("03-1. GET `/`", () => {
    it("should respond with template", (done) => {
      request(app)
        .get("/")
        .expect("Content-Type", /html/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.include("Express");
          done();
        });
    });
  });

  /*

    [ Serving static files ]
    https://expressjs.com/ko/starter/static-files.html
    https://expressjs.com/en/starter/static-files.html

  */
  describe("03-2. GET static assets", () => {
    it("should be able to get static css file", (done) => {
      request(app)
        .get("/stylesheets/style.css")
        .expect("Content-Type", /css/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.include("Lucida Grande");
          done();
        });
    });

    it("should be able to get static js file", (done) => {
      request(app)
        .get("/javascripts/client.js")
        .expect("Content-Type", /javascript/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.include("alert(123);");
          done();
        });
    });
  });
});

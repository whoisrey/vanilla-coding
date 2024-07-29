const request = require("supertest");
const app = require("../app.js");

describe("Signup Page", () => {
  it("should render the signup page", (done) => {
    request(app)
      .get("/signup")
      .expect("Content-Type", /html/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});

describe("Login Page", () => {
  it("should render the login page", (done) => {
    request(app)
      .get("/login")
      .expect("Content-Type", /html/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});

const request = require("supertest");
const { expect } = require("chai");
const jwt = require("jsonwebtoken");
const app = require("../app");

describe("06. JWT Token", () => {
  /*

    [ Generating a token ]
    https://jwt.io/
    https://github.com/auth0/node-jsonwebtoken

  */
  describe("06-1. GET `/user/:user_id/token`", () => {
    it("should not generate token to invalid user", (done) => {
      request(app)
        .get("/users/332/token")
        .type("json")
        .expect("Content-Type", /json/)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.eql({ error: "invalid user" });
          done();
        });
    });

    it("should generate token to valid user", (done) => {
      const targetUserId = 1;
      const user = {
        id: targetUserId,
        name: "ken",
      };

      request(app)
        .get(`/users/${targetUserId}/token`)
        .type("json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.eql({
            result: "ok",
            token: jwt.sign(user, process.env.SECRET_KEY),
          });
          done();
        });
    });
  });

  /*

    [ Validating token ]

  */
  describe("06-2. GET `/user/:user_id/secret`", () => {
    it("should not allow invalid token", (done) => {
      const userId = 1;

      request(app)
        .get(`/users/${userId}/secret`)
        .type("json")
        .set("VC-CLIENT-TOKEN", "invalid-token-random")
        .expect("Content-Type", /json/)
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.eql({ error: "unauthorized" });
          done();
        });
    });

    it("should allow valid client id", (done) => {
      const userId = 1;

      request(app)
        .get(`/users/${userId}/token`)
        .end((err, res) => {
          if (err) return done(err);

          const token = res.body.token;

          request(app)
            .get(`/users/${userId}/secret`)
            .type("json")
            .set("VC-CLIENT-TOKEN", token)
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
              if (err) return done(err);
              expect(res.body).to.eql({
                result: "ok",
                secret: "i am secret something",
              });
              done();
            });
        });
    });
  });
});

const request = require("supertest");
const { expect } = require("chai");
const app = require("../app");
const { USERS } = require("../routes/users");

describe("05. Handling JSON", () => {
  /*

    [ Reading an user in JSON ]
    https://github.com/expressjs/body-parser#bodyparserjsonoptions
    http://expressjs.com/en/api.html#express.json

  */
  describe("05-1. GET `/users`", () => {
    it("should respond with users list json", (done) => {
      request(app)
        .get("/users")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.eql([
            {
              id: 1,
              name: "ken",
            },
            {
              id: 2,
              name: "wonmo",
            },
            {
              id: 3,
              name: "justin",
            },
          ]);
          done();
        });
    });
  });

  /*

    [ Creating an user ]

  */
  describe("05-2. POST `/users`", () => {
    it("should add new user", (done) => {
      request(app)
        .post("/users")
        .send({ id: 4, name: "test" })
        .expect("Content-Type", /json/)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.eql([
            {
              id: 1,
              name: "ken",
            },
            {
              id: 2,
              name: "wonmo",
            },
            {
              id: 3,
              name: "justin",
            },
            {
              id: 4,
              name: "test",
            },
          ]);
          done();
        });
    });
  });

  /*

    [ Updating an user ]

  */
  describe("05-3. PUT `/users/:user_id`", () => {
    it("should update existing user", (done) => {
      request(app)
        .put("/users/4")
        .send({ name: "sample" })
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.eql({ id: 4, name: "sample" });
          done();
        });
    });

    it("should respond with 400 for non-existing user", (done) => {
      request(app)
        .put("/users/78")
        .send({ name: "unbelievable" })
        .expect("Content-Type", /json/)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.eql({ error: "invalid user" });
          done();
        });
    });
  });

  /*

    [ Deleting an user ]

  */
  describe("05-4. DELETE `/user/:user_id`", () => {
    it("should delete user", (done) => {
      const TARGET_ID = 2;

      request(app)
        .delete(`/users/${TARGET_ID}`)
        .type("json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.eql({ result: "ok" });

          const target = USERS.find((user) => user.id === TARGET_ID);
          expect(target).to.be.undefined;
          done();
        });
    });

    it("should respond with 400 for non-existing user", (done) => {
      const INVALID_USER_ID = 38;

      request(app)
        .delete(`/users/${INVALID_USER_ID}`)
        .type("json")
        .expect("Content-Type", /json/)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.eql({ error: "invalid user" });
          done();
        });
    });
  });
});

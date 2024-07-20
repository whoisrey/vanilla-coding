const request = require("supertest");
const app = require("../app");

describe("데이터 베이스가 잘 연결되야합니다", () => {
  const mongoose = require("mongoose");
  const db = mongoose.connection;
  const User = require("../models/User");
  const testUser = { username: "test", password: 1234 };

  const deleteUsers = async () => {
    try {
      return await User.deleteOne({ username: testUser.username });
    } catch (error) {
      throw error;
    }
  };

  before((done) => {
    if (db.readyState === 1) {
      return done();
    }
    db.once("open", done);
  });

  describe("홈 화면 관련 테스트", () => {
    it("처음 들어왔을시 기본 홈 화면이 잘 보여야합니다.", (done) => {
      request(app).get("/").expect(200, done);
    });
  });

  describe("회원가입 관련 테스트", () => {
    afterEach(deleteUsers);

    it("Join 버튼을 클릭시 회원가입 페이지로 이동해야 합니다.", (done) => {
      request(app).get("/join").expect(200, done);
    });

    it("유효한 회원가입 아이디와 비밀번호를 요청시 정상적으로 가입이 되어야합니다", (done) => {
      request(app)
        .post("/join")
        .send(testUser)
        .expect("Location", "/")
        .expect(302);
    });
  });

  describe("로그인 관련 테스트", () => {
    it("로그인 않은 상태에서 문제를 클릭했을때 로그인 페이지로 이동해야 합니다.", (done) => {
      request(app)
        .get("/problem/:problem_id")
        .expect("Location", "/login")
        .expect(302, done);
    });
  });
});

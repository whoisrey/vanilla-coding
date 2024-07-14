const request = require("supertest");
const { expect } = require("chai");
const app = require("../app");

/*

  [ Working with real database ]

  아래 사항들을 완료한 후, 다음 테스트를 진행하세요.

  1. Install MongoDB (바닐라코딩에서 제공된 컴퓨터라면 이미 설치되어 있을 수 있습니다.)
  2. Run MongoDB locally

  ** NOTE: "MongoDB 서버를 실행한 상태"에서 아래 테스트를 실행시키셔야 합니다.

  MongoDB 설치하기
  https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/

  MongoDB 설치 확인하기
  - `brew list` 실행
  - `mongodb-community@버젼`으로 된 패키지 확인

  MongoDB 실행하기
  - `brew list` 실행
  - `mongodb-community@버젼`으로 된 패키지 확인
  - `brew services start mongodb-community@버젼` 실행

  MongoDB 실행 종료하기
  - `brew services stop mongodb-community@버젼` 실행

*/
describe("07. MongoDB database", function () {
  this.timeout(10000);

  const mongoose = require("mongoose");
  const db = mongoose.connection;
  const Article = require("../models/Article");
  const mockArticles = require("./articles.json");

  let storedArticles;

  const storeMockArticles = async () => {
    for (let i = 0; i < mockArticles.length; i++) {
      await new Article(mockArticles[i]).save();
    }
  };

  const fetchAllArticles = (done) => {
    storeMockArticles().then(() => {
      Article.find()
        .lean()
        .exec(function (err, articles) {
          if (err) return done(err);
          storedArticles = JSON.parse(JSON.stringify(articles));
          done();
        });
    });
  };

  const deleteAllArticles = (done) => {
    Article.deleteMany({}, function (err) {
      if (err) return done(err);
      storedArticles = null;
      done();
    });
  };

  before((done) => {
    // wait for database to be connected
    (function checkDatabaseConnection() {
      if (db.readyState === 1) {
        return done();
      }

      setTimeout(checkDatabaseConnection, 1000);
    })();
  });

  /*

    [MongoDB] Reading an article

  */
  describe("07-1. GET `/articles`", () => {
    beforeEach(fetchAllArticles);
    afterEach(deleteAllArticles);

    it("should get all articles from the database and return in response", (done) => {
      request(app)
        .get("/articles")
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);

          const articles = res.body.articles;

          expect(articles).to.exist;
          expect(Array.isArray(articles)).to.be.true;

          expect(articles.length).to.eql(storedArticles.length);
          expect(articles).to.eql(storedArticles);

          done();
        });
    });
  });

  /*

    [MongoDB] Creating an article

  */
  describe("07-2. POST `/articles/new`", () => {
    beforeEach(fetchAllArticles);
    afterEach(deleteAllArticles);

    const newArticle = {
      source: {
        id: null,
        name: "news.ycombinator.com",
      },
      author: "Douglas Crockford",
      title: "WebKit Tracking Prevention Policy",
      description:
        "A first party is a website that a user is intentionally and knowingly visiting, as displayed by the URL field of the browser, and the set of resources on the web operated by the same organization. In practice, we consider resources to belong to the same party if they are part of the same registrable domain: a public suffix plus one additional label. Example: site.example, www.site.example, and s.u.b.site.example are all the same party since site.example is their shared registrable domain. A third party is any party that does not fall within the definition of first party above. This policy doesn't distinguish between companies that own multiple top level domains. I understand that it may be technically hard to figure out but at the policy level are two domains owned by one company really third party to each other? Are example.com and example.us really always different first parties? What about apple.com and iCloud.com ? Or those redirect chains that happen after logging into google such that login cookies are set on youtube.com and whatnot?",
      url: "https://news.ycombinator.com/item?id=20700914",
      urlToImage: "",
      publishedAt: new Date(),
      content:
        "We're willing to do specifically targeted mitigations, but only if we have to.So far, nearly everything we've done has been universal or algorithmic. The one exception I know of was to delete tracking data that had already been planted by known circumventers, at the same time as the mitigation to stop anyone else from using that particular hole (HTTPS super cookies).",
    };

    it("should add a new article into the database", (done) => {
      const userId = 1;

      request(app)
        .get(`/users/${userId}/token`)
        .end((err, res) => {
          if (err) return done(err);

          request(app)
            .post("/articles/new")
            .set("VC-CLIENT-TOKEN", res.body.token)
            .send(newArticle)
            .expect(201)
            .end(async (err, res) => {
              if (err) return done(err);

              expect(res.body.result).to.exist;
              expect(res.body.result).to.eql("ok");

              const article = res.body.article;

              expect(res.body.article).to.exist;
              expect(res.body.article._id).to.exist;
              expect(mongoose.Types.ObjectId.isValid(article._id)).to.be.true;

              const allArticles = await Article.find();
              const addedArticle = await Article.findOne({
                author: "Douglas Crockford",
              });

              expect(allArticles.length).to.eql(storedArticles.length + 1);
              expect(addedArticle).to.exist;

              done();
            });
        });
    });

    // TIP: Look at `routes/articles.js` and `routes/middlewares/authorization.js`
    it("should NOT add a new article with invalid token", (done) => {
      request(app)
        .post("/articles/new")
        .set("VC-CLIENT-TOKEN", "falsyToken-hello,world")
        .send(newArticle)
        .expect(401)
        .end(async (err, res) => {
          if (err) return done(err);

          expect(res.body.result).to.not.exist;
          expect(res.body.error).to.exist;
          expect(res.body.error).to.eql("unauthorized");

          const allArticles = await Article.find();
          const addedArticle = await Article.findOne({
            author: "Douglas Crockford",
          });

          expect(allArticles.length).to.eql(storedArticles.length);
          expect(addedArticle).to.not.exist;

          done();
        });
    });

    it("should NOT add a new article with invalid token", (done) => {
      request(app)
        .post("/articles/new")
        .send(newArticle)
        .expect(401)
        .end(async (err, res) => {
          if (err) return done(err);

          expect(res.body.result).to.not.exist;
          expect(res.body.error).to.exist;
          expect(res.body.error).to.eql("unauthorized");

          const allArticles = await Article.find();
          const addedArticle = await Article.findOne({
            author: "Douglas Crockford",
          });

          expect(allArticles.length).to.eql(storedArticles.length);
          expect(addedArticle).to.not.exist;

          done();
        });
    });
  });

  /*

    [MongoDB] Updating an article

  */
  describe("07-3. PUT `/articles/:article_id`", () => {
    beforeEach(fetchAllArticles);
    afterEach(deleteAllArticles);

    it("should update existing article", (done) => {
      const userId = 1;
      const articleId = storedArticles[0]._id;

      request(app)
        .get(`/users/${userId}/token`)
        .end((err, res) => {
          if (err) return done(err);

          request(app)
            .put(`/articles/${articleId}`)
            .set("VC-CLIENT-TOKEN", res.body.token)
            .send({
              title: "Hello World",
            })
            .expect(200)
            .end(async (err, res) => {
              if (err) return done(err);

              expect(res.body.result).to.exist;
              expect(res.body.result).to.eql("ok");

              const article = res.body.article;

              expect(res.body.article).to.exist;
              expect(res.body.article._id).to.exist;
              expect(mongoose.Types.ObjectId.isValid(article._id)).to.be.true;

              const allArticles = await Article.find();
              const updatedArticle = await Article.findOne({
                title: "Hello World",
              });

              expect(allArticles.length).to.eql(storedArticles.length);
              expect(updatedArticle).to.exist;

              done();
            });
        });
    });

    it("should respond with error if invalid id is given", (done) => {
      const userId = 1;
      const articleId = "invalid-article-id";

      request(app)
        .get(`/users/${userId}/token`)
        .end((err, res) => {
          if (err) return done(err);

          request(app)
            .put(`/articles/${articleId}`)
            .set("VC-CLIENT-TOKEN", res.body.token)
            .send({
              title: "Hello World",
            })
            .expect(400)
            .end(async (err, res) => {
              if (err) return done(err);

              expect(res.body.result).to.not.exist;
              expect(res.body.error).to.exist;
              expect(res.body.error).to.eql("invalid article id");

              expect(res.body.article).to.not.exist;

              done();
            });
        });
    });

    it("should NOT update article with invalid token", (done) => {
      const articleId = storedArticles[0]._id;

      request(app)
        .put(`/articles/${articleId}`)
        .set("VC-CLIENT-TOKEN", "whatareyoudoing,faketoken")
        .send({
          title: "Hello World",
        })
        .expect(401)
        .end(async (err, res) => {
          if (err) return done(err);

          expect(res.body.result).to.not.exist;
          expect(res.body.error).to.exist;
          expect(res.body.error).to.eql("unauthorized");

          const allArticles = await Article.find();
          const updatedArticle = await Article.findOne({
            title: "Hello World",
          });

          expect(allArticles.length).to.eql(storedArticles.length);
          expect(updatedArticle).to.not.exist;

          done();
        });
    });

    it("should NOT update article without token", (done) => {
      const articleId = storedArticles[0]._id;

      request(app)
        .put(`/articles/${articleId}`)
        .send({
          title: "Hello World",
        })
        .expect(401)
        .end(async (err, res) => {
          if (err) return done(err);

          expect(res.body.result).to.not.exist;
          expect(res.body.error).to.exist;
          expect(res.body.error).to.eql("unauthorized");

          const allArticles = await Article.find();
          const updatedArticle = await Article.findOne({
            title: "Hello World",
          });

          expect(allArticles.length).to.eql(storedArticles.length);
          expect(updatedArticle).to.not.exist;

          done();
        });
    });
  });

  /*

    [MongoDB] Deleting an article

  */
  describe("07-4. DELETE `/articles/:article_id`", () => {
    beforeEach(fetchAllArticles);
    afterEach(deleteAllArticles);

    it("should delete existing article", (done) => {
      const userId = 1;
      const articleId = storedArticles[0]._id;

      request(app)
        .get(`/users/${userId}/token`)
        .end((err, res) => {
          if (err) return done(err);

          request(app)
            .delete(`/articles/${articleId}`)
            .set("VC-CLIENT-TOKEN", res.body.token)
            .expect(200)
            .end(async (err, res) => {
              if (err) return done(err);

              expect(res.body.result).to.exist;
              expect(res.body.result).to.eql("ok");
              expect(res.body.article).to.not.exist;

              const allArticles = await Article.find();
              const deletedArticle = await Article.findOne({ _id: articleId });

              expect(allArticles.length).to.eql(storedArticles.length - 1);
              expect(deletedArticle).to.not.exist;

              done();
            });
        });
    });

    it("should respond with error if invalid id is given", (done) => {
      const userId = 1;
      const articleId = "invalid-article-id";

      request(app)
        .get(`/users/${userId}/token`)
        .type("json")
        .end((err, res) => {
          if (err) return done(err);

          request(app)
            .delete(`/articles/${articleId}`)
            .type("json")
            .set("VC-CLIENT-TOKEN", res.body.token)
            .expect(400)
            .end(async (err, res) => {
              if (err) return done(err);

              expect(res.body.result).to.not.exist;
              expect(res.body.error).to.exist;
              expect(res.body.error).to.eql("invalid article id");

              expect(res.body.article).to.not.exist;

              done();
            });
        });
    });

    it("should NOT delete article with invalid token", (done) => {
      const articleId = storedArticles[0]._id;

      request(app)
        .put(`/articles/${articleId}`)
        .type("json")
        .set("VC-CLIENT-TOKEN", "whatareyoudoing,faketoken")
        .expect(401)
        .end(async (err, res) => {
          if (err) return done(err);

          expect(res.body.result).to.not.exist;
          expect(res.body.error).to.exist;
          expect(res.body.error).to.eql("unauthorized");

          const allArticles = await Article.find();
          const undeletedArticle = await Article.findOne({ _id: articleId });

          expect(allArticles.length).to.eql(storedArticles.length);
          expect(undeletedArticle).to.exist;

          done();
        });
    });

    it("should NOT delete article without token", (done) => {
      const articleId = storedArticles[0]._id;

      request(app)
        .put(`/articles/${articleId}`)
        .type("json")
        .expect(401)
        .end(async (err, res) => {
          if (err) return done(err);

          expect(res.body.result).to.not.exist;
          expect(res.body.error).to.exist;
          expect(res.body.error).to.eql("unauthorized");

          const allArticles = await Article.find();
          const undeletedArticle = await Article.findOne({ _id: articleId });

          expect(allArticles.length).to.eql(storedArticles.length);
          expect(undeletedArticle).to.exist;

          done();
        });
    });
  });
});

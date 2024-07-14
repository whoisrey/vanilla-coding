const express = require("express");

const router = express.Router();

const articlesController = require("./controllers/articles.controller");
const { verifyToken } = require("./middlewares/authorization");

router.get("/", articlesController.getAll);
router.post("/new", verifyToken, articlesController.create);
router.put("/:article_id", verifyToken, articlesController.update);
router.delete("/:article_id", verifyToken, articlesController.delete);

module.exports = router;

const express = require("express");

const { isLoggedIn } = require("../passport/auth");
const { renderVoteList } = require("../controllers/pages");

const router = express.Router();

router.get("/", isLoggedIn, renderVoteList(true));

module.exports = router;

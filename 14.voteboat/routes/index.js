const express = require("express");

const { renderVoteList } = require("../controllers/pages");

const router = express.Router();

router.get("/", renderVoteList());

module.exports = router;

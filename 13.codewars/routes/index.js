const express = require("express");

const { renderHomePage } = require("../controllers/pages");

const router = express.Router();

router.get("/", renderHomePage);

module.exports = router;

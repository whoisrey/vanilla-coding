const express = require("express");

const { renderPage } = require("../controllers/pages");
const { login } = require("../controllers/users");

const router = express.Router();

router.get("/", renderPage("login", "Log In"));
router.post("/", login);

module.exports = router;

const express = require("express");

const { renderUserPage } = require("../controllers/pages");
const { login } = require("../controllers/users");
const { isNotLoggedIn } = require("../passport/auth");

const router = express.Router();

router.get("/", isNotLoggedIn, renderUserPage("login"));
router.post("/", isNotLoggedIn, login);

module.exports = router;

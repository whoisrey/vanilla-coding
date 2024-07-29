const express = require("express");

const { isNotLoggedIn } = require("../passport/auth");
const { renderPage } = require("../controllers/pages");
const { createUser } = require("../controllers/users");

const router = express.Router();

router.get("/", isNotLoggedIn, renderPage("signup", "Sign Up"));
router.post("/", isNotLoggedIn, createUser);

module.exports = router;

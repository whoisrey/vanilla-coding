const express = require("express");

const { logout } = require("../controllers/users");
const { isLoggedIn } = require("../passport/auth");

const router = express.Router();

router.get("/", isLoggedIn, logout);

module.exports = router;

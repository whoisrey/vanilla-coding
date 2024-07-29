const express = require("express");

const { isLoggedIn } = require("../passport/auth");
const { logout } = require("../controllers/users");

const router = express.Router();

router.get("/", isLoggedIn, logout);

module.exports = router;

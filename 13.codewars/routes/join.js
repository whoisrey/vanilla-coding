const express = require("express");

const { renderUserPage } = require("../controllers/pages");
const { create } = require("../controllers/users");
const { isNotLoggedIn } = require("../passport/auth");

const router = express.Router();

router.get("/", isNotLoggedIn, renderUserPage("join"));
router.post("/", isNotLoggedIn, create);

module.exports = router;
